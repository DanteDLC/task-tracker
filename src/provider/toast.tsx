"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontSize: "1rem", // default is ~0.875rem, so bump this up
          padding: "16px 20px",
          minWidth: "300px",
          marginTop: "50px",
        },
      }}
    />
  );
};

export default ToasterProvider;
