import { html } from "@elysiajs/html";

import { Elysia } from "elysia";

import * as elements from "typed-html";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body
          class="flex w-full h-screen justify-center items-center bg-slate-900 text-white text-2xl"
          hx-get="/todos"
          hx-trigger="load"
        ></body>
      </BaseHTML>
    )
  )
  .get("todos", () => <TodoList todos={todos} />)
  .post("todos/toggle/:id", ({ params }) => {
    const todo = todos.find((todo) => todo.id === parseInt(params.id));

    if (todo) {
      todo.completed = !todo.completed;
      return <TodoItem {...todo} />;
    }
  })
  .listen(3000, ({ hostname, port }) =>
    console.log(`🦊 Elysia running on http://${hostname}:${port}`)
  );

const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BETH Stack</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
${children}
</html>
`;

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

const todos: Todo[] = [
  {
    id: 1,
    content: "learn beth",
    completed: true,
  },
  {
    id: 2,
    content: "learn golang",
    completed: false,
  },
];

function TodoItem({ id, content, completed }: Todo) {
  return (
    <div class="flex flex-row space-5-x">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/toggle/${id}}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button class="text-red-500">X</button>
    </div>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </div>
  );
}
