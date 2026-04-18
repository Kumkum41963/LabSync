import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ModeratorSelectionModal = ({
  open,
  onOpenChange,
  isReassign = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isReassign ? "Reassign Moderator" : "Assign Moderator"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          Moderator list will appear here
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModeratorSelectionModal;