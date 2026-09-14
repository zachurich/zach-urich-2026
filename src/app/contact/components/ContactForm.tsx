"use client";

import { sendEmail, Submission } from "@/app/actions";
import { Alert } from "@/components/Alert/Alert";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useActionState } from "react";

const initialState: Submission = {
  error: "",
  message: "",
  fields: {
    name: "",
    email: "",
    message: "",
  },
};

type Props = {
  submittedBefore: Submission | null;
};

export const ContactForm = ({ submittedBefore }: Props) => {
  const [state, sendEmailAction, pending] = useActionState(
    sendEmail,
    initialState,
  );

  const getAlert = () => {
    if (state?.message) {
      return <Alert>{state?.message}</Alert>;
    }

    if (!!submittedBefore?.message) {
      return <Alert>{submittedBefore?.message}</Alert>;
    }

    if (state?.error) {
      return <Alert variant="error">{state?.error}</Alert>;
    }

    return null;
  };

  return (
    <form action={sendEmailAction}>
      {getAlert()}
      <div className="form-group">
        <Input
          label="Name"
          name="name"
          required
          maxLength={50}
          minLength={6}
          defaultValue={state?.fields?.name || submittedBefore?.fields?.name}
          disabled={!!submittedBefore}
        />
        <Input
          label="Email"
          name="email"
          required
          maxLength={25}
          minLength={6}
          type="email"
          defaultValue={state?.fields?.email || submittedBefore?.fields?.email}
          disabled={!!submittedBefore}
        />
      </div>
      <Input
        label="Message"
        name="message"
        variant="textarea"
        maxLength={500}
        required
        defaultValue={
          state?.fields?.message || submittedBefore?.fields?.message
        }
        disabled={!!submittedBefore}
      />
      <Input
        variant="honeypot"
        type="email"
        name="email2"
        label="Email Address"
      />
      <Button
        type="submit"
        variant="primary"
        disabled={pending || !!submittedBefore?.fields}
      >
        Submit
      </Button>
    </form>
  );
};
