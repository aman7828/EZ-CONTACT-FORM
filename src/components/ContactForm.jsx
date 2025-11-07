import React, { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const API_ENDPOINT = "https://vernanbackend.ezlab.in/api/contact-us/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setToast({ message: "Message sent successfully!", type: "success" });
        e.target.reset();
      } else {
        const err = await response.json().catch(() => ({}));
        setToast({
          message: err.message || "Server error, please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setToast({
        message: "Network error. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 4000); // hide toast after 4s
    }
  };

  return (
    <div className="relative bg-gray-50 flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 p-4 rounded-lg shadow-md transition-transform transform z-50 ${
            toast.type === "error"
              ? "bg-red-100 text-red-800 border border-red-300"
              : "bg-green-100 text-green-800 border border-green-300"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Get in Touch
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            pattern="[0-9]{10}"
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
            placeholder="Enter your 10-digit phone number"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="6"
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
            placeholder="Write your message here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
