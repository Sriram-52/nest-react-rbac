import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ className }: { className?: string }) {
	return (
		<div className={cn("flex justify-center items-center h-full", className)}>
			<Loader2 className="h-10 w-10 animate-spin text-primary" />
		</div>
	);
}
