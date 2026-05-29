import { createContext } from "react";
import type { User } from "../types/user";

type AuthContextData = {
  user: User | null;
  signIn: () => void;
};

export const AuthContext = createContext({} as AuthContextData);