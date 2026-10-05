"use client";

import { incrementVisitorCount } from "@/app/actions";
import { useEffect } from "react";

/**
 * UI-less component that calls a server action to update the visitor count.
 * The action checks the httpOnly `visited` cookie, so repeat visitors aren't
 * counted twice. Lives in the root layout, so it runs once per full page load.
 */
export const ClientVisited = () => {
  useEffect(() => {
    incrementVisitorCount();
  }, []);

  return null;
};
