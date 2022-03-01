import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Auth from "../components/Auth";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
export default function Home() {
  const { fetchSession, isAuthenticated, plan, confirmMFA, logUserIn } =
    useAuth();
  useEffect(() => {
    fetchSession();
  }, []);
  return (
    <div>
      <SharedHead />
      {isAuthenticated ? <Dashboard plan={plan} /> : <Auth />}
    </div>
  );
}
