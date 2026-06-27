import { useState } from "react";
import delivery from "../../../assets/delivery.png";
import { Link } from "react-router-dom";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/forgotpassword", {
        email: email.trim(),
      });

      toast.success(res.data.message || "Password reset link sent");

      setEmail("");
    } catch (error: any) {
      console.log("Error:", error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-red-900">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            🍽 Noble Restaurant
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Manage restaurant operations, assign deliveries, monitor staff and
            control orders in one place.
          </p>

          <div className="mt-10">
            <img src={delivery} alt="delivery" className="w-full" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-md">
          <h2 className="text-3xl text-white font-bold">Forgot Password</h2>

          <p className="text-gray-300 mt-2">
            Enter your email to receive a password reset link
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-gray-300 block mb-2">Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white outline-none"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 py-4 rounded-xl text-white font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <Link
              to="/auth/login"
              className="block text-gray-400 text-sm text-center hover:text-white transition"
            >
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
