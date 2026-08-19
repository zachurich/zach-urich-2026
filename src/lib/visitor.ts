import db from "@/lib/db";
import VisitorCount from "@/models/VisitorCount";

export const getVistedCookie = (cookie: string | null | undefined) => {
  return cookie === "true";
};

const getVisitorCount = async () => {
  await db();
  const entries = await VisitorCount.findOne({
    id: "visitor_count",
  });
  return entries?.count;
};

const updateVisitorCount = async () => {
  await db();
  await VisitorCount.findOneAndUpdate(
    {
      id: "visitor_count",
    },
    {
      $inc: { count: 1 },
    },
    {
      returnDocument: "after",
      upsert: true,
    },
  );
};

const visitor = {
  getVisitorCount,
  updateVisitorCount,
  getVistedCookie,
};

export default visitor;
