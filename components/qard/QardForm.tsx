"use client";

import { isURL } from "@/lib/utils/strings";
import type { Qard } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormData = {
  accountName: string;
  accountLink: string;
};

type QardProps = {
  qardId?: string;
  userId?: string;
  isEdit?: boolean;
  accountName?: Qard["accountName"];
  accountLink?: Qard["accountLink"];
  onClose(): void;
  getQards(): Promise<void>;
};

export default function QardForm({
  qardId,
  isEdit,
  accountName,
  accountLink,
  onClose,
  getQards,
}: QardProps) {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      accountName: accountName,
      accountLink: accountLink,
    },
  });

  async function onSubmit(data: FormData) {
    const response = await fetch("/api/qard/", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify({
        qardId: qardId,
        userId: session?.user?.id,
        accountName: data.accountName,
        accountLink: data.accountLink,
      }),
    });

    if (response.ok) {
      await getQards();
      onClose();
    }
  }

  return (
    <Card className="w-96 max-w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-primary">
          {isEdit ? "Edit" : "New"} Qard
        </CardTitle>

        <CardDescription>
          {isEdit
            ? "Please alter existing data to edit the Qard"
            : "Please fill out the form to create new Qard"}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="mb-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="accountName">Account Name</FieldLabel>
              <Input
                id="accountName"
                type="text"
                placeholder="Account Name"
                aria-invalid={!!errors.accountName}
                {...register("accountName", {
                  required: "Required field",
                })}
              />
              <FieldError
                errors={
                  errors.accountName
                    ? [{ message: errors.accountName.message }]
                    : undefined
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="accountLink">Account Link</FieldLabel>
              <Input
                id="accountLink"
                type="text"
                placeholder="Account URL"
                aria-invalid={!!errors.accountLink}
                {...register("accountLink", {
                  required: "Required field",
                  validate: (value) => isURL(value) || "Invalid URL",
                })}
              />
              <FieldError
                errors={
                  errors.accountLink
                    ? [{ message: errors.accountLink.message }]
                    : undefined
                }
              />
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
