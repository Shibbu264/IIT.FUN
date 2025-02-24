import { Dialog } from "@shadcn/ui";
import { useState } from "react";

const GlobalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <button onClick={openDialog} className="btn">Open Dialog</button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>
            This is a global dialog box using ShadCN.
          </Dialog.Description>
          <button onClick={closeDialog} className="btn">Close</button>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default GlobalDialog;
