import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import VideoPlayer from "./VideoPlayer";
const AppDemo: React.FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Watch Demo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center justify-center p-6 bg-transparent border-none shadow-none">
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>Demo video</AlertDialogTitle>
          <AlertDialogDescription>
            You are watching now a demo video of InteriorPlanner
          </AlertDialogDescription>
        </AlertDialogHeader>
        <VideoPlayer />
        <AlertDialogFooter>
          <AlertDialogAction>Close Demo</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppDemo;
