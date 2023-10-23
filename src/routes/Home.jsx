import useDocumentTitle from "src/hooks/useDocumentTitle";

function Home(props) {
	useDocumentTitle(props.title);

	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

export default Home;