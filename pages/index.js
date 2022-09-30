import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Auth from "../components/Auth";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import { useIntercom } from "react-use-intercom";

export default function Home() {
  const { fetchSession, isAuthenticated, plan, confirmMFA, logUserIn, loggedInUser } = useAuth();
  useEffect(() => {
    fetchSession();
  }, []);

  const user = loggedInUser?.attributes || {};
  const { boot, shutdown } = useIntercom();

  useEffect(() => {
    isAuthenticated
      ? boot({
          name: `${user["custom:firstName"]} ${user["custom:lastName"]}`,
          email: user.email,
        })
      : shutdown();
  }, [isAuthenticated]);

  return (
    <div>
      <SharedHead />
      {isAuthenticated ? <Dashboard plan={plan} /> : <Auth />}
    </div>
  );
}
