import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAuthError,
  selectAuthStatus,
  selectIsMFARequest,
} from "../../store/selectors/authSelectors";
import { confirmMFA, doLogin, LOGIN_STATUSES } from "../../store/slices/authSlice";
import * as FullStory from '@fullstory/browser';

export default function AuthForm() {
  const loginStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const [mfa, setMFA] = useState("");

  const isMFARequest = useAppSelector(selectIsMFARequest);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const handleValidSubmit = async (event) => {
    event.preventDefault();
    if (isMFARequest) {
      let res;
      if (mfa) {
        res = dispatch(confirmMFA({ mfa }));
      } else {
        //  Should not get here since we're not doing sign up here.
      }
    }

    dispatch(doLogin({ email, password }));
    //sample FullStory SDK calls
    FullStory.setVars('page', {
      userEmail: email
     });
    FullStory.event("Logged in", {
      userEmail: email,
    })
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in with your Pinata account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a href="https://app.pinata.cloud" className="font-medium text-pinata-purple">
                sign up here.
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleValidSubmit}>
            {isMFARequest ? (
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
                disabled={loginStatus === LOGIN_STATUSES.pending}
                className="group relative w-full flex-row justify-center align-center sm:h-auto h-16 sm:py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-pinata-purple outline-none"
              >
                <span>{loginStatus === LOGIN_STATUSES.pending ? "Signing in..." : "Sign in"}</span>
              </button>
              <p className="mt-2 text-center text-sm text-red-600">{authError}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
