"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Trash2Icon, TrashIcon } from "lucide-react";

interface DeleteUserButtonProps {
  userId: string;
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, setIsPending] = React.useState(false);

  async function handleClick() {
    setIsPending(true);

    setIsPending(false);
  }

  return (
    <Button
      variant={"destructive"}
      size={"icon-sm"}
      disabled={isPending}
      onClick={handleClick}
    >
      <span className="sr-only">Delete User</span>
      <Trash2Icon />
    </Button>
  );
};

export const PlaceholderDeleteUserButton = () => {
  return (
    <Button variant={"destructive"} size={"icon-sm"} disabled>
      <span className="sr-only">Delete User</span>
      <Trash2Icon />
    </Button>
  );
};
