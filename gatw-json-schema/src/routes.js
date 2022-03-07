import recipeSchema from "./schemas/recipe-v1.schema.json" assert { type: "json" };

export default async function routes(fastify) {
  fastify.post(
    "/",
    { schema: { body: recipeSchema } },
    async function createRecipe(request, reply) {
      const newRecipe = request.body;

      /**
       * In a real application we would save the recipe to a database here.
       */
      if (!newRecipe) {
        throw new Error("Error creating recipe");
      }

      request.log.info("New recipe created");

      reply.status(201);

      return newRecipe;
    }
  );
}
