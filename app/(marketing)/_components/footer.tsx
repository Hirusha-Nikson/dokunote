"use client";

const Footer = () => {
  return (
    <footer className="w-full border-t-2 py-6 px-4 text-center text-sm text-muted-foreground bg-foreground dark:bg-background rounded-t-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Dokunote. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-background dark:hover:text-foreground transition">
            Privacy
          </a>
          <a href="/terms" className="hover:text-background dark:hover:text-foreground transition">
            Terms
          </a>
          <a
            href="mailto:you@example.com"
            className="hover:text-background dark:hover:text-foreground transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
