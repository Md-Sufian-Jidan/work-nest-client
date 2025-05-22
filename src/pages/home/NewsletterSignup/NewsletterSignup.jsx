import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
    // Handle actual submission logic here (e.g., API call)
  };

  return (
    <section className="py-16 px-4 bg-bg-soft dark:bg-bg-dark  text-center shadow-card dark:shadow-none">
      <h2 className="text-3xl font-heading font-bold text-text-main dark:text-accent mb-3">
        Join Our Newsletter
      </h2>
      <p className="text-text-secondary dark:text-text-secondary font-body mb-6">
        Stay updated with the latest news, tips, and exclusive offers.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto"
        noValidate
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-bg-soft border border-gray-300 dark:border-gray-600
            text-text-main dark:text-white font-body placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby="email-error"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-btn text-white font-semibold font-heading
            hover:bg-btn-hover transition flex items-center justify-center gap-2"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>

      {error && (
        <p
          id="email-error"
          className="mt-3 text-sm text-accent font-body"
          role="alert"
        >
          {error}
        </p>
      )}

      {success && !error && (
        <p
          className="mt-3 text-sm text-primary font-body"
          role="status"
        >
          Thank you for subscribing!
        </p>
      )}
    </section>
  );
};

export default NewsletterSignup;
