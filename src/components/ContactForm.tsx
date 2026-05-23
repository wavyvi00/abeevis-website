"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (scriptsLoaded) return;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      setScriptsLoaded(true);

      const script = document.createElement("script");
      script.src = "https://web3forms.com/client/script.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    const currentForm = formRef.current;
    if (currentForm) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadScripts();
              observer.disconnect();
            }
          });
        },
        { rootMargin: "200px" }
      );

      observer.observe(currentForm);

      currentForm.addEventListener("focusin", loadScripts, { passive: true });
      currentForm.addEventListener("mouseenter", loadScripts, { passive: true });
      currentForm.addEventListener("touchstart", loadScripts, { passive: true });

      return () => {
        observer.disconnect();
        currentForm.removeEventListener("focusin", loadScripts);
        currentForm.removeEventListener("mouseenter", loadScripts);
        currentForm.removeEventListener("touchstart", loadScripts);
      };
    }
  }, [scriptsLoaded]);

  return (
    <form ref={formRef} action="https://api.web3forms.com/submit" method="POST" className="contact-form">
      <input type="hidden" name="access_key" value="05fcf5c4-d650-49b5-aa1a-1e04ad81555d" />
      <input type="hidden" name="redirect" value="https://abeevis.com/message-sent" />
      <input type="hidden" name="subject" value="New Submission from Abeevis Website" />
      <input type="hidden" name="from_name" value="Abeevis Contact Form" />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      <div className="form-group">
        <input type="text" name="name" placeholder="Your Name" required className="form-input" />
      </div>
      <div className="form-group">
        <input type="text" name="business_name" placeholder="Business Name" className="form-input" />
      </div>
      <div className="form-group">
        <input type="tel" name="phone" placeholder="Phone Number" className="form-input" />
      </div>
      <div className="form-group">
        <input type="email" name="email" placeholder="Your Email" required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="service-select" className="sr-only">
          What are you looking for?
        </label>
        <select id="service-select" name="service" className="form-select" required defaultValue="">
          <option value="" disabled>
            What are you looking for?
          </option>
          <option value="New Website">New Website</option>
          <option value="Recreate Website">Recreate Website</option>
          <option value="Website & Online Ordering">Website & Online Ordering</option>
          <option value="Google Ads / Marketing">Google Ads / Marketing</option>
          <option value="Other">Other / General Inquiry</option>
        </select>
      </div>
      <div className="form-group">
        <textarea name="message" placeholder="Tell us about your project..." required className="form-textarea" rows={4} />
      </div>

      <div className="h-captcha" data-captcha="true"></div>

      <button type="submit" className="btn-primary btn-large btn-block">
        Send Message
      </button>
    </form>
  );
}
