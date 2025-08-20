import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-8 sm:px-10 px-5 bg-black">
      <div className="screen-max-width">
        {/* Top Notice */}
        <div className="space-y-2 text-center sm:text-left">
          <p className="font-semibold text-[#86868b] text-xs sm:text-sm">
            More ways to shop:
            <span className="underline text-[#2997FF] cursor-pointer hover:opacity-80">
              {" "}
              Find a store{" "}
            </span>
            or
            <span className="underline text-[#2997FF] cursor-pointer hover:opacity-80">
              {" "}
              other retailer{" "}
            </span>
            near you.
          </p>
          <p className="font-semibold text-[#86868b] text-xs sm:text-sm">
            Or call 08-1234-5678
          </p>
        </div>

        {/* Divider */}
        <div className="bg-neutral-700 my-6 h-[1px]" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center sm:text-left">
          {/* Copyright */}
          <p className="font-semibold text-[#86868b] text-xs sm:text-sm">
            © 2025 Sandiego2049 Inc. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2">
            {footerLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className="font-semibold text-[#86868b] text-xs sm:text-sm hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
