import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import React from "react";

const Alert = ({ showAlert, type, message }) => {
  if (showAlert) {
    return (
      <div className={`border-l-4 ${type === "warning" || type === "error" ? "border-yellow-400 bg-yellow-50" : "border-green-400 bg-green-50"} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {
            type === "warning" || type === "error" ? <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" /> : 
            <CheckIcon className="h-5 w-5 text-green-400" />
          }          
        </div>
        <div className="ml-3">
          <p className={`text-sm ${type === "warning" || type === "error" ? "text-yellow-700" : "text-green-700"}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
    );
  } else {
    return <div />;
  }
};

export default Alert;
