import React from "react";
import s from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <div data-role="text-content" className={s.newslettersection}>
      <div className={s.newslettercontent}>
        <div data-role="form-header" className={s.newletterhead}>
          <h2>Stay on top of crypto. All the time, any time.</h2>
          <p>
            Please keep me updated by email with the latest crypto news,
            research findings, reward programs, event updates, coin listings,
            and more information from CoinMarketCap.
          </p>
        </div>
        <div data-role="form-body" className={s.newslettersubmit}>
          <div>
            <input placeholder="Enter your e-mail address" type="text" />
          </div>
          <div>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div data-role="banner-content" className={s.newletterbanner}>
        <img
          data-role="banner-image"
          src="https://s2.coinmarketcap.com/static/cloud/img/newsletter_bg_light.svg?_=fffc8c0"
          loading="lazy"
          alt="Newsletter Banner"
        />
      </div>
    </div>
  );
};

export default Newsletter;
