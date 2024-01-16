# beth-stack

This project utilizes a stack comprising several technologies for web development.

## Technologies Used:

1. **Bun:**

    - Bun is an all-in-one JavaScript runtime providing server-side and client-side development features.

2. **ElysiaJS:**

    - ElysiaJS is a server-side JavaScript framework designed for building web applications.

3. **Turso:**

    - Turso is a command-line interface (CLI) tool for interacting with databases.

4. **htmx:**
    - htmx is a JavaScript library facilitating server-client interactions without requiring a full page reload.

## Some Scripts:

-   **install:** Install some packages.

```
bun install
```

-   **start:** Run your project.

```
bun run start
```

-   **dev:** Run your project in watch mode, which automatically restarts on file changes.

```
bun run dev
```

-   **db:push:** Push your SQLite database schema using drizzle-kit.

```
bun run db:push
```

-   **db:studio:** Open the Drizzle Kit Studio for database management.

```
bun run db:studio
```

## Create A Table and Insert Data as Initialization

Before use database on client, we need to set up the initial table structure and populate it with sample data, you can use the Turso CLI. Follow these steps:

1. Open the Turso CLI and connect to your database. Replace "database-name" with the actual name of your database.

    ```
    turso db shell "database-name"
    ```

2. Inside the Turso CLI, run the following SQL commands to create a table named "todos" with the specified columns:

    ```
    CREATE TABLE IF NOT EXISTS todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       content TEXT NOT NULL,
       completed INTEGER NOT NULL DEFAULT 0
    );
    ```

3. After creating the table, insert sample data into the "todos" table. This example inserts a todo with the content "Sample Todo Content" and completion status set to 0 (assuming 0 represents false for boolean values):

    ```
    INSERT INTO todos (content, completed) VALUES ('Sample Todo Content', 0);
    ```

By following these steps, you initialize your database with a "todos" table and insert an initial todo for testing purposes.

##

This project was created using `bun init` in bun v1.0.23. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
