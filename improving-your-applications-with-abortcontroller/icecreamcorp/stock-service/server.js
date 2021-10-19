import Fastify from "fastify";

const app = Fastify();

app.get("/stock", function (request, reply) {
	const stock = [
		{ id: "cf93d53f-7f60-4c9d-a543-ef217a09269b", name: "Cookies 'n' Cream", stock: 8532 },
		{ id: "41373bb6-e6fb-4606-8f01-1cd24e228939", name: "Neopolitan", stock: 0 },
		{ id: "8e884a8d-ae04-4518-80b7-377ee5bcecc6", name: "Pistachio", stock: 6437 }
	];

	const delay = Math.floor(Math.random() * 10000);

	setTimeout(() => {
		reply.send({ stock, delay });
	}, delay);
});

await app.listen(4000);
