import fetch from "node-fetch";

const cancelRequest = new AbortController();

fetch("https://jsonplaceholder.typicode.com/posts", {
	signal: cancelRequest.signal
})
	.then(response => response.json())
	.then(responseData => console.log(responseData))
	.catch(error => console.error(error));

cancelRequest.abort();
