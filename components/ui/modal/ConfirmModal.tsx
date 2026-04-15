"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Modal from "./Modal";

type ConfirmModalProps = {
  open: boolean;
  message: string;
  onConfirmAction: () => void;
  onCancelAction: () => void;
};

export default function ConfirmModal({
  open,
  message,
  onConfirmAction,
  onCancelAction,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onCancelAction}
    >
      <Card className="w-96 max-w-full shadow-xl">
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold">{message}</h2>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onCancelAction}
            >
              No
            </Button>
            <Button onClick={onConfirmAction}>Yes</Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}
