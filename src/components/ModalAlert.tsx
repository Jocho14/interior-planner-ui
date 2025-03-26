import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalAlertProps {
  open: boolean;
  primaryAction: "cancel" | "confirm";
  message?: string;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void;
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  open,
  primaryAction,
  message,
  setOpen,
  handleConfirm,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {message ? message : "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {primaryAction === "confirm" ? (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Continue
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogAction>Cancel</AlertDialogAction>
              <AlertDialogCancel onClick={handleConfirm}>
                Continue
              </AlertDialogCancel>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalAlert;
