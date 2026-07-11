import db from "@/lib/db";
import GuestBookEntry from "@/models/GuestBookEntry";

const getGuestBookEntries = async () => {
  await db();
  const entries = await GuestBookEntry.find();
  return entries;
};

const saveGuestBookEntry = async (name: string, message: string) => {
  await db();
  const newEntry = new GuestBookEntry({ name, message, createdAt: new Date() });
  await newEntry.save();
  return newEntry;
};

const removeGuestBookEntry = async (id: string) => {
  await db();
  const deletedEntry = await GuestBookEntry.findByIdAndDelete(id);
  return deletedEntry;
};

const __debug_flushAllGuestBookEntries = async () => {
  await db();
  const deletedEntries = await GuestBookEntry.deleteMany({});
  return deletedEntries;
};

const guestBook = {
  getGuestBookEntries,
  saveGuestBookEntry,
  removeGuestBookEntry,
  __debug_flushAllGuestBookEntries,
};

export default guestBook;
