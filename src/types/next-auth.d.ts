// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface AdapterUser {
    id: string;
    email: string;
    username?: string;
    surname?: string;
    completedOnboarding?: boolean;
  } 

  interface User {
    id: string;
    email: string;
    username?: string;
    surname?: string;
    completedOnboarding?: boolean;
  }
}
