import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground, FormWrapper, InputField, PasswordField, LockIcon, UserIcon, KeyIcon } from "../shared";

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "", show_password: false });
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const togglePassword = () => setCredentials((prev) => ({ ...prev, show_password: !prev.show_password }));
  const handleSubmit = (e) => { e.preventDefault(); login(credentials.email, credentials.password); };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
      <AnimatedBackground />
      <FormWrapper title="Welcome Back" subtitle="Sign in to access your account" icon={<LockIcon />}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField name="email" type="email" value={credentials.email} onChange={handleChange} placeholder="Email Address" icon={<UserIcon />} />
          <PasswordField name="password" value={credentials.password} show={credentials.show_password} onChange={handleChange} toggleShow={togglePassword} placeholder="Password" />
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold">{loading ? "Logging In..." : "Login"}</button>
          <p className="text-sm text-gray-500 text-center">
            Don&apos;t have an account?
            <span className="ml-1 cursor-pointer font-medium text-blue-600 hover:underline" onClick={() => navigate("/register")}>Create one</span>
          </p>
        </form>
      </FormWrapper>
    </div>
  );
};

export default LoginPage;
