import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/providers/AuthProvider";
import { LogOut, UserCircle } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { signOut } = useAuth();

	return (
		<>
			<nav className="bg-background border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex-shrink-0 flex items-center">
							<Link to="/">
								<img className="h-8 w-auto" src="/vite.svg" alt="Logo" />
							</Link>
						</div>
						<div className="ml-3 relative flex items-center">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-8 w-8 rounded-full">
										<Avatar className="h-8 w-8">
											<AvatarImage src="/placeholder.svg" alt="@username" />
											<AvatarFallback>
												<UserCircle className="h-6 w-6" />
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={signOut}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</nav>
			<main
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
				style={{ minHeight: "calc(100vh - 4rem)" }}
			>
				{children}
			</main>
		</>
	);
}
