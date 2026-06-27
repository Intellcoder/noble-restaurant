import { useState } from "react";
import delivery from "../../../assets/delivery.png";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../../store/auth.store";

type Role = "admin" | "worker" | "rider";

const roles: Role[] = ["admin", "worker", "rider"];

const redirectByRole = {
  admin: "/admin",
  worker: "/worker/dashboard",
  rider: "/rider/dashboard",
};

const LoginPage = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [role, setRole] = useState<Role>("admin");

  const [form, setForm] = useState({
    credential: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.credential || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        credential: form.credential.trim(),
        password: form.password,
        role,
      });

      setAuth({
        user: data.responseUser,
        accessToken: data.accessToken,
      });

      console.log(data.responseUser.role);
      navigate(redirectByRole[data.responseUser.role as Role]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isWorker = role === "worker";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-red-900">
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold">🍽 Noble Restaurant</h1>

          <p className="mt-6 text-gray-300 text-lg">
            Manage restaurant operations, deliveries and orders.
          </p>

          <div className="mt-10">
            <img src={delivery} alt="delivery" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md">
          <h2 className="text-3xl text-white font-bold">Welcome Back</h2>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`py-3 rounded-xl capitalize ${
                  role === item
                    ? "bg-red-600 text-white"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              name="credential"
              value={form.credential}
              onChange={handleChange}
              placeholder={isWorker ? "Email or User ID" : "Enter email"}
              className="w-full p-4 rounded-xl bg-white/5 text-white"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-white/5 text-white"
            />

            <button
              disabled={loading}
              className="w-full bg-red-600 py-4 rounded-xl text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <Link to="/auth/forgot" className="block text-center text-gray-400">
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
