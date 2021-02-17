// Fastify async await usage
fastify.get("/", async (request, reply) => {
	const data = await getData();
	const processed = await processData(data);
	reply.send(processed);
});

// Express example
app.get("/user/:user_id", (request, response) => {
	getUser(request.params.user_id).then(response.json);
});
