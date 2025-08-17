import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground, FormWrapper, InputField, PasswordField } from "../shared";

const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", confirm_password: "", show_password: false, loading: false });
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const togglePassword = () => setForm((prev) => ({ ...prev, show_password: !prev.show_password }));

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register with:", form);
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
      <AnimatedBackground />
      <FormWrapper title="Create Account">
        <form onSubmit={handleRegister} className="space-y-6">
          <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
          <PasswordField label="Password" name="password" value={form.password} show={form.show_password} onChange={handleChange} toggleShow={togglePassword} placeholder="Create a password" />
          <PasswordField label="Confirm Password" name="confirm_password" value={form.confirm_password} show={form.show_password} onChange={handleChange} toggleShow={togglePassword} placeholder="Confirm your password" />
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold">Create Account</button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?
          <span className="text-blue-600 cursor-pointer ml-1 hover:underline font-medium" onClick={() => navigate("/")}>Login</span>
        </p>
      </FormWrapper>
    </div>
  );
};

export default RegisterPage;
