import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

function AppDailog({
  buttonText,
  dialogTitle,
  dialogDesc,
  dialogContent,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDesc && <DialogDescription>{dialogDesc}</DialogDescription>}
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}

export default AppDailog;
