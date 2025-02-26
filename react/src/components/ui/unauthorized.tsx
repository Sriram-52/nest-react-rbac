import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
						<AlertOctagon className="w-8 h-8 text-red-500 mr-2" />
						Unauthorized Access
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-center text-gray-600">
						You're not authorized to access this content. Please contact the administrator if you
						believe this is an error.
					</p>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button asChild>
						<Link to="/">Return to Home</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
