// lib/pii-filter.ts

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/g;

export interface PIIResult {
  cleanedMessage: string;
  emails: string[];
  phones: string[];
  hasPII: boolean;
}

export function detectAndMaskPII(message: string): PIIResult {
  const emails = message.match(EMAIL_REGEX) || [];
  const phones = message.match(PHONE_REGEX) || [];

  let cleanedMessage = message;
  emails.forEach((email) => {
    cleanedMessage = cleanedMessage.replace(email, "[EMAIL_PROVIDED]");
  });
  phones.forEach((phone) => {
    cleanedMessage = cleanedMessage.replace(phone, "[PHONE_PROVIDED]");
  });

  return {
    cleanedMessage,
    emails,
    phones,
    hasPII: emails.length > 0 || phones.length > 0,
  };
}

export async function routePIIToEmail(
  emails: string[],
  phones: string[],
  originalMessage: string,
  conversationSummary: string
) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: "New Contact Info from Chat Assistant",
        from_name: "Portfolio Assistant",
        // Web3Forms requires a field named "email" to process the submission
        email: emails[0] || "no-reply@portfolio.com",
        client_email: emails.join(", ") || "Not provided",
        client_phone: phones.join(", ") || "Not provided",
        original_message: originalMessage,
        conversation_context: conversationSummary,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    console.log("Web3Forms PII routing result:", result);

    if (!result.success) {
      console.error("Web3Forms submission failed:", result);
    }
  } catch (error) {
    console.error("Failed to route PII to email:", error);
  }
}
