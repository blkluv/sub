import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuth } from "../../hooks/useAuth";

export default function AuthForm() {
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [mfa, setMFA] = useState("");
  const [confirmCode, setConfirmCode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { confirmMFA, logUserIn } = useAuth();

  const handleValidSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setAuthError(null);
    if (confirmCode) {
      let res;
      if (mfa) {
        res = await confirmMFA(user, mfa);
      } else {
        //  Should not get here since we're not doing sign up here.
      }
      if (res.success) {
        setSubmitting(false);
        // props.history.push("/authenticate");
      } else {
        setSubmitting(false);
        setAuthError(res.error.message);
      }
    } else {
      const result = await logUserIn(email, password);
      setSubmitting(false);
      if (result.user && result.user.challengeName) {
        //  Indicates the user has MFA enabled
        setSubmitting(false);
        setUser(result.user);
        setConfirmCode(true);
      } else if (
        result.error &&
        result.error.code &&
        result.error.code === "UserNotConfirmedException"
      ) {
        setAuthError(
          "Account has not been confirmed, enter code that was previously emailed or request a new one"
        );
        setConfirmCode(true);
      } else if (!result.success) {
        setAuthError(result.error.message);
      } else {
        // props.history.push("/authenticate");
        //REDIRECT HERE
      }
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in with your Pinata account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="https://app.pinata.cloud"
                className="font-medium text-pinata-purple"
              >
                sign up here.
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleValidSubmit}>
            {confirmCode ? (
              <div>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="mfs" className="sr-only">
                      Multifactor Authentication Confirmation Code
                    </label>
                    <input
                      id="mfs"
                      name="mfa"
                      type="text"
                      required
                      value={mfa}
                      onChange={(e) => setMFA(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="MFA code"
                    />
                  </div>     
                </div>
              </div>
            ) : (
              <div>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

               
              </div>
            )}
             <div className="mt-4">
                  <button
                    type="submit"
                    className="group relative w-full flex-row justify-center align-center sm:h-auto h-16 sm:py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-pinata-purple outline-none"
                  >
                    <span>{submitting ? "Signing in..." : "Sign in"}</span>
                  </button>
                </div>
          </form>
        </div>
      </div>
    </>
  );
}
