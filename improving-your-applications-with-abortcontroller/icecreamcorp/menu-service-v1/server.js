import fetch from "node-fetch";
import Fastify from "fastify";

async function makeRequest(url) {
	const response = await fetch(url);

	const responseData = await response.json();

	return responseData;
}

const app = Fastify();

app.get("/menu", async function (request, reply) {
	const stockServiceEndpoint = "http://stock-service.icecreamcorp.net:4000/stock";

	const stockServiceResponse = await makeRequest(stockServiceEndpoint);

	reply.send({ stockServiceResponse });
});

await app.listen(3000);
