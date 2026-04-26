import React from "react";

const FormWrapper = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default FormWrapper;