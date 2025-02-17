import LoadingSpinner from "@/components/ui/loading-spinner";
import { usePostsControllerIndAll } from "@/lib/api";
import { Link } from "react-router-dom";

export default function PostsList() {
	const { data: posts, isLoading } = usePostsControllerIndAll({ query: { initialData: [] } });

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
							<h3 className="text-xl font-semibold">{post.title}</h3>
							<p>{post.content.substring(0, 100)}...</p>
							<p className="mt-2">Status: {post.published ? "Published" : "Draft"}</p>
							<Link to={`/edit-post/${post.id}`} className="text-blue-500 hover:underline">
								Edit
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
