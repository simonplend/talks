import fetch from "node-fetch";
import Fastify from "fastify";

async function makeRequest(url) {
	const response = await fetch(url);

	const responseData = await response.json();

	return responseData;
}

function timeout(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error(`Request cancelled as it took longer than ${delay}ms`));
		}, delay);
	});
}

const app = Fastify();

app.get("/menu", async function (request, reply) {
	const stockServiceEndpoint = "http://stock-service.icecreamcorp.net:4000/stock";

	const stockServiceResponse = await Promise.race([
		makeRequest(stockServiceEndpoint), timeout(1000)
	]);

	reply.send({ stockServiceResponse });
});

await app.listen(3000);
