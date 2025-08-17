/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from "react";

// --- A beautiful, animated background ---
export const AnimatedBackground = () => (
  <div
    aria-hidden="true"
    className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-gray-50"
  >
    <div className="absolute top-[-20%] left-[5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
    <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
  </div>
);

// --- Reusable Form Wrapper ---
export const FormWrapper = ({ children, title, subtitle, icon }) => (
  <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm border border-gray-200">
    {icon && (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
          {icon}
        </div>
      </div>
    )}
    {title && <h1 className="text-3xl font-extrabold text-gray-800 text-center">{title}</h1>}
    {subtitle && <p className="mt-2 text-gray-500 text-center">{subtitle}</p>}
    <div className="mt-6">{children}</div>
  </div>
);

// --- Reusable Input Field ---
export const InputField = ({ label, name, type, value, onChange, placeholder, icon }) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
    )}
    {icon && (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        {icon}
      </div>
    )}
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-xl border border-gray-300 py-3 ${
        icon ? "pl-12 pr-4" : "px-5"
      } text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400`}
      required
    />
  </div>
);

// --- Reusable Password Field ---
export const PasswordField = ({
  label,
  name,
  value,
  show,
  onChange,
  toggleShow,
  placeholder,
}) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
    )}
    <input
      id={name}
      type={show ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-5 py-3 border border-gray-300 rounded-xl 
                 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 
                 focus:border-transparent transition-all duration-200 
                 text-gray-800 placeholder-gray-500 pr-12"
      required
    />
    <button
      type="button"
      aria-label={show ? "Hide password" : "Show password"}
      className="absolute inset-y-0 right-0 pr-4 flex items-center top-7"
      onClick={toggleShow}
    >
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
    {/* Autofill override styles */}
    <style jsx>{`
      input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #1f2937 !important; /* Tailwind gray-800 */
        transition: background-color 5000s ease-in-out 0s;
      }
    `}</style>
  </div>
);

// --- Reusable SVG Icons ---
export const LockIcon = () => (
  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const UserIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const KeyIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

export const EyeIcon = () => (
  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
  </svg>
);
