"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Modal from "./Modal";

type AlertDialogProps = {
  open: boolean;
  message: string;
  onCloseAction: () => void;
};

export default function AlertDialog({
  open,
  message,
  onCloseAction,
}: AlertDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCloseAction}
    >
      <Card className="w-96 max-w-full shadow-xl">
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold">{message}</h2>
          <div className="flex justify-end">
            <Button onClick={onCloseAction}>OK</Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}
