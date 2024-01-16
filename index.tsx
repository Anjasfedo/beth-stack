import { html } from "@elysiajs/html";

import { Elysia } from "elysia";

import * as elements from "typed-html";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body>
          <h1>Anjas</h1>
        </body>
      </BaseHTML>
    )
  )
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BETH Stack</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>
${children}
</html>
`;
