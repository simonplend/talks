import fetch from "node-fetch";
import Fastify from "fastify";

import { setTimeout } from "node:timers/promises";

const app = Fastify();

app.get("/menu", async function (request, reply) {
	const cancelTimeout = new AbortController();
	const cancelRequest = new AbortController();

	async function makeRequest(url) {
		try {
			const response = await fetch(url, { signal: cancelRequest.signal });

			const responseData = await response.json();

			return responseData;
		} finally {
			cancelTimeout.abort();
		}
	}

	async function timeout(delay) {
		try {
			await setTimeout(delay, undefined, { signal: cancelTimeout.signal });
			cancelRequest.abort();
		} catch (error) {
			return;
		}

		throw new Error(`Request aborted as it took longer than ${delay}ms`);
	}

	const stockServiceEndpoint = "http://stock-service.icecreamcorp.net:4000/stock";

	const stockServiceResponse = await Promise.race([
		makeRequest(stockServiceEndpoint),
		timeout(1000)
	]);

	reply.send({ stockServiceResponse });
});

await app.listen(3000);
