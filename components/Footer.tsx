export default function Footer() {
  return (
    <footer className="py-16 px-6 text-center border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-[#86868b] mb-2">
          Built with Next.js, TypeScript & GSAP
        </p>
        <p className="text-xs text-[#c7c7cc]">
          © {new Date().getFullYear()} Raj Ponkiya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
