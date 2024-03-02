import { Link, useParams } from "react-router-dom";
import { useGetEachPostQuery } from "./api/mainApi";

export default function Post() {
	const { todoId } = useParams();
	const {
		data: todo,
		isSuccess,
		isLoading,
		isFetching,
		isError,
		error
	} = useGetEachPostQuery(todoId!, {
		// pollingInterval: 3000,
		// refetchOnMountOrArgChange: true,
		skip: false
	});

	let todoContent;
	if (isLoading) {
		todoContent = <p>Loading...!</p>
	} else if (isError) {
		todoContent = <span>{JSON.stringify(error)}</span>
	} else if (isSuccess) {
		todoContent = (
			<section style={{ position: 'relative' }}>
				<span> <Link to="/">Go Back Home</Link> </span>
				<h1>Todo: {todoId} {isFetching ? '...refetching' : ''}</h1>
				<h2>{todo.title}</h2>
			</section>
		);
	}

	return (
		<>
			{todoContent}
		</>
	);
}