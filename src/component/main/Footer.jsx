import React from "react";
import s from "./Footer.module.css";
import coinlogoblack from "/coinlogoblack.png";

const Footer = () => {
  return (
    <footer data-role="global-container" className={s.footer}>
      <div className={s.footersection}>
        <div>
          <img src={coinlogoblack} alt="logo" />
        </div>
        <div className={s.footernav}>
          <div>
            <span>Products</span>
            <ul>
              <li>
                <a
                  href="https://coinmarketcap.com/product-updates/all/"
                  target="_blank"
                  rel="noopener"
                >
                  Product Updates
                </a>
              </li>
              <li>
                <a
                  href="https://coinmarketcap.com/events/cmc-labs/"
                  target="_blank"
                  rel="noopener"
                >
                  CMC Labs
                </a>
              </li>
              <li>
                <a
                  href="https://coinmarketcap.com/api/"
                  target="_blank"
                  rel="noopener"
                >
                  Crypto API
                </a>
              </li>
              <li>
                <a href="/doodles/" target="_blank" rel="noopener">
                  Doodles
                </a>
              </li>
              <li>
                <a href="/sitemap/currencies/" target="_blank" rel="noopener">
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  href="https://coinmarketcap.com/events/advertise/"
                  target="_blank"
                  rel="noopener"
                >
                  Advertise
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span>Company</span>
            <ul>
              <li>
                <a href="/about/" target="_blank" rel="noopener">
                  About us
                </a>
              </li>
              <li>
                <a href="/terms/" target="_blank" rel="noopener">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="/privacy/" target="_blank" rel="noopener">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookie-policy/" target="_blank" rel="noopener">
                  Cookie policy
                </a>
              </li>
              <li>
                <a
                  href="https://support.coinmarketcap.com/hc/en-us/articles/4412939497755/"
                  target="_blank"
                  rel="noopener"
                >
                  Community Rules
                </a>
              </li>
              <li>
                <a href="/jobs/" target="_blank" rel="noopener">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span>Support</span>
            <ul>
              <li>
                <a
                  href="https://support.coinmarketcap.com/hc/en-us/requests/new?ticket_form_id=360000493112"
                  target="_blank"
                  rel="noopener"
                >
                  Get Listed
                </a>
              </li>
              <li>
                <a href="/request/" target="_blank" rel="noopener">
                  Request Form
                </a>
              </li>
              <li>
                <a
                  href="https://support-chat.coinmarketcap.com/"
                  target="_blank"
                  rel="noopener"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a href="/faq/" target="_blank" rel="noopener">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://coinmarketcap.com/academy/glossary"
                  target="_blank"
                  rel="noopener"
                >
                  Glossary
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span>Socials</span>
            <ul>
              <li>
                <a
                  href="https://twitter.com/CoinMarketCap"
                  target="_blank"
                  rel="noopener"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/CoinMarketCapAnnouncements"
                  target="_blank"
                  rel="noopener"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/coinmarketcap/"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/CoinMarketCap"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/r/CoinMarketCap/"
                  target="_blank"
                  rel="noopener"
                >
                  Reddit
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/coinmarketcap/"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.copywrite}>
        © 2024 CoinMarketCap. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
