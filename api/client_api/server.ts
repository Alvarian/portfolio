import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import router from './routes/project-routes.ts';


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const port = Deno.env.get("PORT") || 5000;
console.log(`Server listening on port ${port}`);
await app.listen({ port: +port });