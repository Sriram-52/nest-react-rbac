import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback(props: FallbackProps) {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center p-8 rounded-lg bg-red-50">
				<h2 className="text-2xl font-semibold text-red-600 mb-2">Something went wrong!</h2>
				<div className="text-red-500 mb-4">{props.error.message}</div>
				<button
					onClick={props.resetErrorBoundary}
					className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
