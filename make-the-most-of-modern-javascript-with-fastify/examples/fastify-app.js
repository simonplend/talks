import Fastify from "fastify";

const app = Fastify({ logger: { prettyPrint: true } });

function getUser(userId) {
	return Promise.resolve({
		id: userId,
		first_name: "Bobinsky",
	});
}

app.get("/user/:user_id", async (request, reply) => {
	const user = await getUser(request.params.user_id);
	reply.send(user);
});

const PORT = process.env.PORT || 3000;

await app.listen(PORT);
