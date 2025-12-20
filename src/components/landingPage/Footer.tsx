import React, { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

// ==================== TYPES ====================
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// ==================== FOOTER COMPONENT ====================
const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const footerColumns: FooterColumn[] = [
    {
      title: "Documentation",
      links: [
        { label: "Medical", href: "#" },
        { label: "Operation", href: "#" },
        { label: "Laboratory", href: "#" },
        { label: "ICU", href: "#" },
      ],
    },
    {
      title: "Treatments",
      links: [
        { label: "Neurology", href: "#" },
        { label: "Cardiologist", href: "#" },
        { label: "Dentist", href: "#" },
        { label: "Urology", href: "#" },
      ],
    },
    {
      title: "Specialities",
      links: [
        { label: "Neurology", href: "#" },
        { label: "Cardiologist", href: "#" },
        { label: "Dentist", href: "#" },
        { label: "Urology", href: "#" },
      ],
    },
    {
      title: "Utilities",
      links: [
        { label: "Medical", href: "#" },
        { label: "Operation", href: "#" },
        { label: "Laboratory", href: "#" },
        { label: "ICU", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Youtube size={18} />, href: "#", label: "YouTube" },
  ];

  const handleSubscribe = () => {
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Footer Columns */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-500 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe & Stay Updated from the Doccure
            </p>

            {/* Email Input */}
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSubscribe}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
              >
                Send
              </button>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white transition"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2025 Doccure. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition">
                Terms and Conditions
              </a>
              <span>•</span>
              <a href="#" className="hover:text-blue-500 transition">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
