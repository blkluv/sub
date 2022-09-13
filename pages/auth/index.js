import React, { useEffect } from "react";
import Auth from "../../components/Auth";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import SharedHead from "../../components/SharedHead";

const AuthWrapper = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <SharedHead />
      <Auth />
    </div>
  );
};

export default AuthWrapper;
