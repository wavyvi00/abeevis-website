"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      siteId: "abeevis",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      business_name: formData.get("business_name"),
      companyWebsite: formData.get("companyWebsite"), // Honeypot
      sourcePage: window.location.href,
    };

    // If business_name is provided, append it to the message or handle appropriately
    if (data.business_name) {
      data.message = `Business Name: ${data.business_name}\n\n${data.message}`;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      // Success - redirect to message sent page
      router.push("/message-sent");
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
      {/* Honeypot field - hidden from users */}
      <input type="text" name="companyWebsite" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      {error && (
        <div className="form-error bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="form-group">
        <input type="text" name="name" placeholder="Your Name" required className="form-input" disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <input type="text" name="business_name" placeholder="Business Name" className="form-input" disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <input type="tel" name="phone" placeholder="Phone Number" className="form-input" disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <input type="email" name="email" placeholder="Your Email" required className="form-input" disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <label htmlFor="service-select" className="sr-only">
          What are you looking for?
        </label>
        <select id="service-select" name="service" className="form-select" required defaultValue="" disabled={isSubmitting}>
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
        <textarea name="message" placeholder="Tell us about your project..." required className="form-textarea" rows={4} disabled={isSubmitting} />
      </div>

      <button type="submit" className="btn-primary btn-large btn-block" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
