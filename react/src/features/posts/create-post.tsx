import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { postsControllerCreateBody, usePostsControllerCreate } from "@/lib/api";
import { useAuth } from "@/lib/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import * as z from "zod";
import { Input } from "@/components/ui/input";

import "react-quill-new/dist/quill.snow.css";
import { Checkbox } from "@/components/ui/checkbox";

type FormValues = z.infer<typeof postsControllerCreateBody>;

export default function CreatePost() {
	const { user } = useAuth();

	const { mutateAsync, isPending } = usePostsControllerCreate();

	const form = useForm<FormValues>({
		resolver: zodResolver(postsControllerCreateBody),
		defaultValues: {
			title: "",
			content: "",
			authorId: user?.uid ?? "",
			published: false,
		},
	});

	async function onSubmit(data: FormValues) {
		await mutateAsync({ data });
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Create New Post</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>
									<ReactQuill
										{...field}
										theme="snow"
										modules={{
											toolbar: [
												[{ header: [1, 2, 3, 4, 5, 6, false] }],
												["bold", "italic", "underline", "strike", "blockquote"],
												[{ list: "ordered" }, { list: "bullet" }],
												["link", "image"],
												["clean"],
												["code-block"],
											],
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="published"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox checked={field.value} onChange={field.onChange} />
								</FormControl>
								<FormLabel>Publish</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Create Post
					</Button>
				</form>
			</Form>
		</div>
	);
}
