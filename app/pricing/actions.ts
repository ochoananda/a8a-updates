"use server";

import { prisma } from "../../lib/prisma"; // relative path avoids tsconfig alias issues

type Tier = "free" | "standard" | "premium";

// TEMP for local testing: reads a client id from .env
async function getCurrentUserId(): Promise<string | null> {
  return process.env.SEED_USER_ID ?? null;
}

export async function setTier(formData: FormData) {
  const nextTier = formData.get("tier");
  if (nextTier !== "free" && nextTier !== "standard" && nextTier !== "premium") {
    throw new Error("Invalid tier");
  }

  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Not authenticated");

  await prisma.client.update({
    where: { id: userId },
    data: { tier: nextTier as Tier },
  });

  return { ok: true };
}
