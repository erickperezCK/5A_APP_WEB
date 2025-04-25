import { useState, useEffect } from "react";
import { Clear } from "@mui/icons-material";

export const Notification = ({ open, severity, message, handleClose }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);
  
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  const severityStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  const closeNotification = () => {
    setVisible(false);
    handleClose();
  };

  return (
    visible && (
        <div
            className={`fixed bottom-5 right-5 z-500 p-4 rounded-xl shadow-lg transition-all duration-300 transform ${
            open
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 pointer-events-none"
            } ${severityStyles[severity]}`}
        >
        <div className="flex justify-between items-center">
          <p className="font-medium">{message}</p>
          <button onClick={closeNotification} className="ml-4 text-white cursor-pointer">
            <Clear />
          </button>
        </div>
      </div>
    )
  );
};
