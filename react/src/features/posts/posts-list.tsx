import LoadingSpinner from "@/components/ui/loading-spinner";
import { usePostsControllerFindAll, usePostsControllerRemove } from "@/lib/api";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import { useAuthStore } from "@/lib/store/auth";
import { Trash2 } from "lucide-react";
import { Can } from "@/components/ui/can";
import { Button } from "@/components/ui/button";

export default function PostsList() {
	const { user } = useAuthStore();
	const { data: posts, isLoading } = usePostsControllerFindAll({ query: { initialData: [] } });

	const { mutateAsync } = usePostsControllerRemove();

	const handleDeletePost = async (id: string) => {
		try {
			await mutateAsync({ id });
		} catch (error) {
			console.error("Error deleting post", error);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<h1 className="text-3xl font-bold mb-4">Simple Post App</h1>
			<Link
				to="/create-post"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Create New Post
			</Link>
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Posts</h2>
				<ul>
					{posts.map((post) => (
						<li key={post.id} className="mb-4 p-4 border rounded">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-xl font-semibold">{post.title}</h3>
									{parser(post.content)}
									<p className="mt-2">Status: {post.published ? "Published" : "Draft"}</p>
									<p className="mt-2">
										Author: {post.author?.id === user?.id ? "Me" : post.author?.name}
									</p>
									<Link to={`/edit-post/${post.id}`} className="text-blue-500 hover:underline">
										Edit
									</Link>
								</div>
								<Can I="delete" a="Post" passThrough>
									{(allowed) => (
										<Button
											aria-label="Delete post"
											onClick={() => handleDeletePost(post.id)}
											disabled={!allowed}
											size="icon"
											variant="destructive"
										>
											<Trash2 size={20} />
										</Button>
									)}
								</Can>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
