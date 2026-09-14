import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);
export const toAddress = process.env.RESEND_EMAIL as string;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
