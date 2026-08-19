"use client";

import { incrementVisitorCount } from "@/app/actions";
import { useEffect } from "react";

/**
 * UI-less component that posts to the /api/visited endpoint to update the visitor count.
 * @returns
 */
export const ClientVisited = ({ visited }: { visited: boolean }) => {
  useEffect(() => {
    if (!visited) {
      incrementVisitorCount();
    }
  }, [visited]);

  return null;
};
