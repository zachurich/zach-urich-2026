"use server";

import { emailRegex, resend, toAddress } from "@/lib/resend";
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

export async function getVisitorCount() {
  const count = await visitor.getVisitorCount();
  return count;
}

export type Submission = {
  error: string;
  message: string;
  fields: {
    name: string;
    email: string;
    message: string;
  };
};

const isSubmission = (data: unknown): data is Submission => {
  return typeof data === "object" && !!data?.hasOwnProperty("fields");
};

export async function getSubmission() {
  const cookieList = await cookies();
  const cookie = JSON.parse(cookieList.get("contact")?.value ?? "{}");
  return isSubmission(cookie) ? cookie : null;
}

export async function sendEmail(initialState: unknown, data: FormData) {
  const cookieList = await cookies();
  const cookie = await getSubmission();
  const email = data.get("email") as string;
  const name = data.get("name") as string;
  const message = data.get("message") as string;
  const honeypot = data.get("email2");

  const response: Submission = {
    error: "",
    message: "",
    fields: {
      name,
      email,
      message,
    },
  };

  if (!!honeypot) {
    response.message = "Thanks...";
    return response;
  }

  if (!!cookie?.fields) {
    response.error = "You have submitted before";
    return cookie;
  }

  if (!message || !name || !email) {
    response.error = "Missing some fields there?";
    return response;
  }

  const isValidEmail = emailRegex?.test(email);
  if (!isValidEmail) {
    response.error = "That email is NOT valid.";
    return response;
  }

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: toAddress,
      replyTo: email,
      subject: `Contact Form Submission: ${name}`,
      text: `From: ${email}\n\n${message}`,
    });
  } catch {
    response.error =
      "Something went wrong. I'm not really sure what to tell you :/";
    return response;
  }

  const success = {
    ...response,
    message: "You did it! Thanks for reaching out.",
    error: "",
  };

  cookieList.set({
    name: "contact",
    value: JSON.stringify(success),
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return success;
}
