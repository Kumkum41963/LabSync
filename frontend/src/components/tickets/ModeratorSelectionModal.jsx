import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTickets } from "@/context/TicketsContext";

const ModeratorSelectionModal = ({ open, onOpenChange, ticketId, isReassign = false }) => {
  const { assignMod, unassignMod, getSuggestedModerators } = useTickets();
  const [moderators, setModerators] = useState([]);
  const [selectedModId, setSelectedModId] = useState(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchModerators = async () => {
      if (!open || !ticketId) {
        console.log("[ModeratorModal] Skipped fetch: modal closed or ticketId missing", { open, ticketId });
        return;
      }

      console.log("[ModeratorModal] Fetching suggested moderators for ticket:", ticketId);
      setLoading(true);

      try {
        console.log("[ModeratorModal] Calling API for suggested moderators...");
        const res = await getSuggestedModerators(ticketId);
        console.log("[ModeratorModal] API Response received:", res);

        const suggested = res.data?.suggestedModerators || res.data || [];
        console.log("[ModeratorModal] Parsed suggested moderators:", suggested);

        setModerators(suggested);
      } catch (err) {
        console.error("[ModeratorModal] Failed to load suggested moderators:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModerators();
  }, [open, ticketId]);

  const handleCheckboxChange = async (modId, isChecked) => {
    console.log("[ModeratorModal] Checkbox toggled:", { modId, isChecked, ticketId });
    try {
      if (isChecked) {
        setSelectedModId(modId);
        console.log("[ModeratorModal] Assigning moderator:", modId);
        const result = await assignMod(ticketId, modId);
        console.log("[ModeratorModal] Assignment result:", result);
      } else {
        setSelectedModId(null);
        console.log("[ModeratorModal] Unassigning moderator from ticket:", ticketId);
        const result = await unassignMod(ticketId);
        console.log("[ModeratorModal] Unassignment result:", result);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("[ModeratorModal] Error updating moderator assignment:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border border-border text-foreground">
        <DialogHeader>
          <DialogTitle>
            {isReassign ? "Reassign Moderator" : "Assign Moderator"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center text-muted-foreground text-sm">
            Loading suggested moderators...
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-sm">
                  <th className="py-3 px-4">Moderator</th>
                  <th className="py-3 px-4">Skills</th>
                  <th className="py-3 px-4 text-center">Assign</th>
                </tr>
              </thead>
              <tbody>
                {moderators.map((mod) => (
                  <tr key={mod._id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-foreground">{mod.name}</div>
                      <div className="text-sm text-muted-foreground">{mod.email}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {mod.skills?.join(", ") || "No skills listed"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedModId === mod._id}
                        onChange={(e) => handleCheckboxChange(mod._id, e.target.checked)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModeratorSelectionModal;