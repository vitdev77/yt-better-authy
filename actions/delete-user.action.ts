"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function deleteUserAction({ userId }: { userId: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  if (session.user.role !== "ADMIN" || session.user.id === userId) {
    throw new Error("FORBIDDEN");
  }

  try {
  } catch (err) {}
}
