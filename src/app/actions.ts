"use server";

import visitor from "@/lib/visitor";
import { cookies } from "next/headers";

export async function incrementVisitorCount() {
  const cookieList = await cookies();
  const visitedBefore = visitor.getVistedCookie(
    cookieList.get("visited")?.value,
  );
  if (!visitedBefore) {
    await visitor.updateVisitorCount();
    cookieList.set({
      name: "visited",
      value: "true",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
}
