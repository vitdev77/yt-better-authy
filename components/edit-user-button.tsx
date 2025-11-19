"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconPencil } from "@tabler/icons-react";

interface EditUserButtonProps {
  userId: string;
}

export const EditUserButton = ({ userId }: EditUserButtonProps) => {
  const [isPending, setIsPending] = React.useState(false);

  return (
    <Button size={"icon-sm"} disabled={isPending}>
      <span className="sr-only">Edit User</span>
      {isPending ? <IconLoader2 className="animate-spin" /> : <IconPencil />}
    </Button>
  );
};

export const PlaceholderEditUserButton = () => {
  return (
    <Button variant={"outline"} size={"icon-sm"} disabled>
      <span className="sr-only">Edit User</span>
      <IconPencil />
    </Button>
  );
};
