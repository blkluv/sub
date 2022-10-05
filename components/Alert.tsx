import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAlert } from "../store/selectors/alertSelectors";
import { clearAlert } from "../store/slices/alertSlice";

export enum AlertType {
  Warning = "warning",
  Error = "error",
}

const Alert = () => {
  const { type, message, timeout } = useAppSelector(selectAlert);
  console.log("alert", { type, message, timeout });
  const dispatch = useAppDispatch();
  if (timeout) {
    setTimeout(() => {
      dispatch(clearAlert());
    }, timeout);
  }
  if (!message) {
    return null;
  }

  console.log({ type, message });
  return (
    <div
      className={`border-l-4 ${
        type === AlertType.Warning || type === "error"
          ? "border-yellow-400 bg-yellow-50"
          : "border-green-400 bg-green-50"
      } p-4 fixed w-screen top-0 left-0 z-50`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === AlertType.Warning || type === AlertType.Error ? (
            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          ) : (
            <CheckIcon className="h-5 w-5 text-green-400" />
          )}
        </div>
        <div className="ml-3">
          <p
            className={`text-sm ${
              type === AlertType.Warning || type === AlertType.Error
                ? "text-yellow-700"
                : "text-green-700"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
