import { html } from "@elysiajs/html";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(html())
  .get(
    "/",
      ({ html }) =>
        html(baseHTML)
  )
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const baseHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BETH Stack</title>
</head>
<body>
    <h1>Anjasfedo</h1>
</body>
</html>`;
