import { Resend } from "resend";

let client: Resend | undefined;

/**
 * Created on first use rather than at module load, so builds and pages that
 * import this module don't require RESEND_API_KEY (e.g. Preview deployments).
 */
export const getResend = () => {
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
};

export const toAddress = process.env.RESEND_EMAIL as string;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
