import express from "express";

const app = express();

function getUser(userId) {
	return Promise.resolve({
		id: userId,
		first_name: "Bobinsky",
	});
}

app.get("/user/:user_id", async (request, response, next) => {
	const user = await getUser(request.params.user_id);
	response.json(user);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
