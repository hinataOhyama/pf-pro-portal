"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth-option";

export const getAuthSession = async () => getServerSession(authOptions);
