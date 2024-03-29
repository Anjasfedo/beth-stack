import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import * as elements from "typed-html";
import { todosDB } from "./database";
import { Todo, todos } from "./database/schema";
import { eq } from "drizzle-orm";

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
    .get("todos", async () => {
        const data = await todosDB.select().from(todos).all();

        return <TodoList todos={data} />;
    })
    .post("todos/toggle/:id", async ({ params }) => {
        const oldTodo = await todosDB.select().from(todos).where(eq(todos.id, params.id)).get();

        const newTodo = await todosDB
            .update(todos)
            .set({ completed: !oldTodo?.completed })
            .where(eq(todos.id, params.id))
            .returning()
            .get();
        return <TodoItem {...newTodo} />;
    })
    .delete("/todos/:id", async ({ params }) => {
        await todosDB.delete(todos).where(eq(todos.id, params.id)).run();
    })
    .post("/todos", async ({ body }) => {
        if (!body || !body.content) {
            throw new Error("Input Empty");
        }

        const newTodoData = {
            content: body.content,
        };

        try {
            // Insert the new todo into the database
            const newTodo = await todosDB.insert(todos).values(newTodoData).returning().get();

            // Return the created todo as a response
            return <TodoItem {...newTodo} />;
        } catch (error) {
            console.error("Error creating todo:", error);
            // Handle the error and send an appropriate response
            throw new Error("Failed to create todo");
        }
    })
    .listen(3000, ({ hostname, port }) => console.log(`🦊 Elysia running on http://${hostname}:${port}`));

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

function TodoItem({ id, content, completed }: Todo) {
    return (
        <div class="flex flex-row space-x-3">
            <p>{content}</p>
            <input
                type="checkbox"
                checked={completed}
                hx-post={`/todos/toggle/${id}`}
                hx-target="closest div"
                hx-swap="outerHTML"
            />
            <button class="text-red-500" hx-delete={`/todos/${id}`} hx-target="closest div" hx-swap="outerHTML">
                X
            </button>
        </div>
    );
}

function TodoList({ todos }: { todos: Todo[] }) {
    return (
        <div>
            {todos.map((todo) => (
                <TodoItem {...todo} />
            ))}
            <TodoForm />
        </div>
    );
}

function TodoForm() {
    return (
        <form class="flex flex-row space-x-3" hx-post="/todos" hx-swap="beforebegin">
            <input type="text" name="content" class="border border-white text-slate-950" />
            <button type="submit">Add</button>
        </form>
    );
}
