"use client";

import { useEffect, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import type { Qard } from "@prisma/client";
import { capitalize } from "@/lib/utils/strings";

import QardForm from "@/components/qard/QardForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IconGeneric from "@/components/ui/icons/IconGeneric";
import Modal from "@/components/ui/modal/Modal";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import AlertDialog from "@/components/ui/modal/AlertDialog";

type QardListItemProps = {
  qard: Qard;
  getQards(): Promise<void>;
  index: number;
};

export default function QardListItem({
  qard,
  getQards,
  index,
}: QardListItemProps) {
  const [openEditQard, setOpenEditQard] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleOpenEditQard = () => setOpenEditQard((prev) => !prev);
  const handleOpenConfirmDelete = () => setOpenConfirmDelete((prev) => !prev);
  const handleOpenAlertDialog = () => setOpenAlertDialog((prev) => !prev);

  async function confirmDeleteQard() {
    let success = false;
    try {
      const response = await fetch("/api/qard", {
        method: "DELETE",
        body: JSON.stringify(qard.id),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(errorData.message || "Failed to delete Qard");
        setOpenAlertDialog(true);
      } else {
        success = true;
      }
    } catch (error) {
      console.error("Error deleting Qard:", error);
      const errMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete Qard. Please try again.";
      setAlertMessage(errMessage);
      setOpenAlertDialog(true);
    } finally {
      setOpenConfirmDelete(false);
      if (success) {
        await getQards();
      }
    }
  }

  useEffect(() => {
    if (qard.position !== index) {
      const updatePosition = async (qard: Qard) => {
        const response = await fetch("/api/qard", {
          method: "PATCH",
          body: JSON.stringify({
            ...qard,
            position: index,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update position");
        }

        await getQards();
      };

      updatePosition(qard).catch((error) => {
        console.error("Failed to update position:", error);
        const errMessage =
          error instanceof Error
            ? error.message
            : "Failed to update position. Please try again.";
        setAlertMessage(errMessage);
        setOpenAlertDialog(true);
      });
    }
  }, [index, qard, getQards]);

  return (
    <Draggable
      draggableId={String(qard.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          key={qard.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="my-4"
        >
          {openEditQard && (
            <Modal
              open={openEditQard}
              onClose={handleOpenEditQard}
            >
              <QardForm
                isEdit
                qardId={qard.id}
                onClose={handleOpenEditQard}
                accountLink={qard.accountLink}
                accountName={qard.accountName}
                getQards={getQards}
              />
            </Modal>
          )}

          {openConfirmDelete && (
            <ConfirmModal
              open={openConfirmDelete}
              message="Delete Qard?"
              onConfirmAction={confirmDeleteQard}
              onCancelAction={handleOpenConfirmDelete}
            />
          )}

          {openAlertDialog && (
            <AlertDialog
              open={openAlertDialog}
              message={alertMessage}
              onCloseAction={handleOpenAlertDialog}
            />
          )}

          <Card
            className={`w-full border transition-all ${
              snapshot.isDragging
                ? "border-primary ring-2 ring-primary/40 shadow-lg"
                : "border-border/80"
            }`}
          >
            <CardContent className="flex items-center gap-3 py-3">
              <Avatar size="lg">
                <AvatarFallback>
                  {qard.accountLink === null ? (
                    <IconGeneric name="undef" />
                  ) : (
                    <IconGeneric name={qard.accountLink} />
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1 text-sm font-medium">
                <span className="truncate block">
                  {capitalize(qard.accountName)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={handleOpenEditQard}
                  aria-label="Edit qard"
                >
                  <AiOutlineEdit className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  onClick={handleOpenConfirmDelete}
                  aria-label="Delete qard"
                >
                  <AiOutlineDelete className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
