"use client";

import { ArrowUp, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import MagneticButton from "./animations/MagneticButton";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linksCompany = [
    { name: "About Us", href: "https://maitrawealth.com/about-us/" },
    { name: "Compliances", href: "https://maitrawealth.com/complainces/" },
    { name: "Downloads", href: "https://maitrawealth.com/downloads/" },
    { name: "Contact Us", href: "#contact" },
  ];

  const linksProducts = [
    { name: "Maitra Web", href: "https://maitrawealth.com/our-products/" },
    { name: "Smart Trader Mobile", href: "https://maitrawealth.com/our-products/" },
    { name: "Maitra API Suite", href: "https://maitrawealth.com/our-products/" },
    { name: "Mutual Funds", href: "https://maitrawealth.com/our-products/" },
    { name: "Wealth Insurance", href: "https://maitrawealth.com/our-products/" },
  ];

  const linksLegal = [
    { name: "Privacy Policy", href: "https://maitrawealth.com/privacy-policy/" },
    { name: "Terms & Conditions", href: "https://maitrawealth.com/terms-conditions/" },
    { name: "Investor Charter", href: "https://maitrawealth.com/complainces/" },
    { name: "Filing Complaint (SCORES)", href: "https://scores.gov.in/" },
  ];

  return (
    <footer className="relative w-full bg-background pt-20 pb-12 px-4 md:px-8 border-t border-white/5 overflow-hidden">
      {/* Background glowing particles highlight */}
      <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full radial-glow-teal pointer-events-none opacity-25 blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand details */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#"
              className="flex items-center gap-2 text-2xl font-display font-black tracking-tight text-white mb-6 interactive"
            >
              <span className="text-brand-teal text-glow-teal font-light">M</span>
              <span>MAITRA</span>
            </a>
            <p className="text-sm font-light text-white/40 leading-relaxed mb-6 max-w-sm">
              Maitra Commodities is a SEBI registered broker, dedicated to offering advanced tech-driven investment terminals, robust algorithmic APIs, and wealth solutions at flat rates.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:support@maitracommodities.com"
                className="text-xs text-white/50 hover:text-brand-teal transition-colors flex items-center gap-1.5 interactive"
              >
                <Mail className="w-3.5 h-3.5" /> support@maitracommodities.com
              </a>
              <a
                href="tel:+914440068282"
                className="text-xs text-white/50 hover:text-brand-teal transition-colors flex items-center gap-1.5 interactive"
              >
                <Phone className="w-3.5 h-3.5" /> +91 44 4006 8282
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-7">
            {/* Products Column */}
            <div className="flex flex-col items-start">
              <h4 className="text-xs uppercase tracking-widest text-brand-teal font-medium mb-5">Products</h4>
              <ul className="space-y-3.5 text-sm font-light text-white/40">
                {linksProducts.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-0.5 interactive"
                    >
                      {link.name} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col items-start">
              <h4 className="text-xs uppercase tracking-widest text-brand-teal font-medium mb-5">Company</h4>
              <ul className="space-y-3.5 text-sm font-light text-white/40">
                {linksCompany.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors interactive"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col items-start col-span-2 sm:col-span-1">
              <h4 className="text-xs uppercase tracking-widest text-brand-teal font-medium mb-5">Regulatory & Legal</h4>
              <ul className="space-y-3.5 text-sm font-light text-white/40">
                {linksLegal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors interactive"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Details Box (Fintech Credentials) */}
        <div className="py-10 border-b border-white/5">
          <h4 className="text-xs uppercase tracking-wider text-brand-teal font-medium mb-6">
            Maitra Commodities Pvt. Ltd. Regulatory Credentials
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-light text-white/40 leading-relaxed">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="font-semibold text-white/70 block mb-1">SEBI Registration No</span>
              INZ000074139
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="font-semibold text-white/70 block mb-1">CDSL Depository DP ID</span>
              12089400
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="font-semibold text-white/70 block mb-1">Exchange Memberships</span>
              NSE Member ID: 90157<br />
              BSE Member ID: 6736<br />
              MCX Member ID: 56485
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="font-semibold text-white/70 block mb-1">Registered Address</span>
              No.1, First Floor, Muniappa Road, Kilpauk, Chennai - 600010, Tamil Nadu.
            </div>
          </div>
        </div>

        {/* Regulatory Risk Disclaimer block */}
        <div className="py-10 text-[10px] sm:text-xs font-light text-white/20 leading-relaxed text-justify space-y-4">
          <p>
            <strong>Stock Brokerage Risk Disclaimer:</strong> Investment in securities market are subject to market risks, read all the related documents carefully before investing. Brokerage will not exceed the SEBI prescribed limit. Regulated by Securities and Exchange Board of India (SEBI). CDSL regulations apply for depository custody accounts.
          </p>
          <p>
            Prevent unauthorized transactions in your trading/demat account. Update your mobile numbers/email IDs with your stock brokers/depository participant. Receive information of your transactions directly from Exchange/Depository on your mobile/email at the end of the day. Issued in the interest of investors.
          </p>
          <p>
            Attention Investors: As per SEBI circular dated March 16, 2023, KYC details update is mandatory for all accounts. Please submit updated PAN, Address, Email and Mobile logs to avoid account lock codes.
          </p>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="text-xs font-light text-white/30 text-center sm:text-left">
            © 2026 Maitra Commodities. All rights reserved. SEBI INZ000074139 | CDSL 12089400.
          </div>

          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-teal/40 transition-colors duration-300 text-white flex items-center justify-center bg-white/5 interactive"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
