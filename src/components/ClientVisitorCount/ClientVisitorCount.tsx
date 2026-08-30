"use client";

import { useEffect, useState } from "react";
import { getVisitorCount } from "@/app/actions";

export const ClientVisitorCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    getVisitorCount().then((_count) => {
      if (typeof _count === "number") {
        setCount(_count);
      }
    });
  }, []);
  return count;
};
