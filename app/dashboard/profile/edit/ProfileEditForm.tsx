"use client";

import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormData = {
  name: User["name"];
  username: User["username"];
  company: User["company"];
  jobRole: User["jobRole"];
};

export default function ProfileEditForm({ user }: { user: User }) {
  const router = useRouter();

  const [usernamePresent, setUsernamePresent] = useState<boolean>(
    !!user.username,
  );

  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: user.name ?? "",
      username: user.username ?? "",
      company: user.company ?? "",
      jobRole: user.jobRole ?? "",
    },
  });

  async function onSubmit(data: FormData) {
    const userData = {
      id: user.id,
      name: data.name,
      username: data.username,
      company: data.company,
      jobRole: data.jobRole,
    };

    const response = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const updatedUser = await response.json();

      if (updatedUser.username) {
        setUsernamePresent(true);
      }

      router.push("/dashboard");
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Edit profile</CardTitle>
        <CardDescription>
          Update your public profile information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {!usernamePresent && <WelcomeCTA name={user.name} />}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                disabled={usernamePresent}
                aria-invalid={!!formState.errors.username}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              <FieldDescription>
                {usernamePresent
                  ? "Username already set and cannot be changed."
                  : "You can set username only once."}
              </FieldDescription>
              <FieldError
                errors={
                  formState.errors.username
                    ? [{ message: formState.errors.username.message }]
                    : undefined
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input
                id="company"
                type="text"
                placeholder="Company"
                {...register("company")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="jobRole">Job Role</FieldLabel>
              <Input
                id="jobRole"
                type="text"
                placeholder="Job Role"
                {...register("jobRole")}
              />
            </Field>
          </FieldGroup>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formState.isValid}
            >
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function WelcomeCTA({ name }: { name: User["name"] }) {
  return (
    <Card className="bg-muted/40">
      <CardContent className="space-y-2 pt-4 text-sm">
        <p className="text-base font-medium">Hello {name}!</p>
        <p>
          This is your first sign in into Qards App. Please create your profile
          so that you can use it properly.
        </p>
        <p>
          Please notice, you must set your <strong>Username</strong> and you can
          do it just <strong>ONCE!</strong>
        </p>
        <p>So, choose wisely.</p>
      </CardContent>
    </Card>
  );
}
