import React from "react";
import { SignInComponent } from "../components/sign-in";
import { useAuth } from "../hooks/use-auth";
import { Redirect } from "react-router";

export function LoginPage() {
  const auth = useAuth();

  return auth.user ? <Redirect to="/" /> : <SignInComponent />;
}
