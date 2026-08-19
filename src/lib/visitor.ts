import db from "@/lib/db";
import VisitorCount from "@/models/VisitorCount";

export const getVistedCookie = (cookie: string | null | undefined) => {
  return cookie === "true";
};

const getVisitorCount = async () => {
  try {
    await db();
    const entries = await VisitorCount.findOne({
      id: "visitor_count",
    });
    return entries?.count as number | null;
  } catch {
    return null;
  }
};

const updateVisitorCount = async () => {
  try {
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
  } catch {
    return Promise.resolve();
  }
};

const visitor = {
  getVisitorCount,
  updateVisitorCount,
  getVistedCookie,
};

export default visitor;
