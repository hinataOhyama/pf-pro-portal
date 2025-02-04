"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./option";

export const getAuthSession = async () => getServerSession(authOptions);
