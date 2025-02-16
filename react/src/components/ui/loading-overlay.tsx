import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
	isLoading: boolean;
	message?: string;
	className?: string;
}

export function LoadingOverlay({ isLoading, className }: LoadingOverlayProps) {
	if (!isLoading) return null;

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
				className,
			)}
		>
			<div className="flex flex-col items-center space-y-4 text-center">
				<Loader2 className="h-10 w-10 animate-spin text-primary" />
			</div>
		</div>
	);
}
