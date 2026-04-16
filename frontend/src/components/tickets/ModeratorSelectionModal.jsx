import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const ModeratorSelectionModal = ({open, onOpenCHange}) => {
  return (
    
            <h1>hello from assign mods</h1>
  )
}

export default ModeratorSelectionModal;

{/* Moderator Selection Modal */}
            // <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            //     <DialogContent className="sm:max-w-[400px]">
            //         <DialogHeader>
            //             <DialogTitle>Assign Moderator to Ticket</DialogTitle>
            //         </DialogHeader>
            //         <div className="flex flex-col gap-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
            //             {moderators.length > 0 ? (
            //                 moderators.map((mod) => (
            //                     <Button
            //                         key={mod._id}
            //                         variant="ghost"
            //                         className="w-full justify-start border border-transparent hover:border-primary hover:bg-primary/5 p-6 h-auto"
            //                         onClick={() => handleSelectModerator(mod._id)}
            //                     >
            //                         <div className="text-left">
            //                             <p className="font-bold text-foreground">{mod.name}</p>
            //                             <p className="text-xs text-muted-foreground">{mod.email}</p>
            //                         </div>
            //                     </Button>
            //                 ))
            //             ) : (
            //                 <p className="text-sm text-center py-10 text-muted-foreground">No moderators found.</p>
            //             )}
            //         </div>
            //     </DialogContent>
            // </Dialog>