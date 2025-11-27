import { MotionDiv } from "@/components/MotionDiv";
import { Loader, Loader2 } from "lucide-react";

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4"
    >
      <h1 className="text-2xl font-semibold">Something special is loading.... <Loader2 className="animate-spin" /></h1>
    </MotionDiv>
  );
}
