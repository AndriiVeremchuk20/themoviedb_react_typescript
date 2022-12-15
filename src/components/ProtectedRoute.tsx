import React from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/user";

interface PropsProtectedRoute {
  user: IUser | null;
  redirectPath: string;
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<PropsProtectedRoute> = ({
  user,
  redirectPath = "/login",
  children,
}) => {
  const navigate = useNavigate();

  if (!user) {
    navigate(redirectPath);
  }

  return children;
};
