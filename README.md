# beth-stack

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Create A table and Insert data on it as initialization with

```
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
);

```

```
INSERT INTO todos (content, completed) VALUES ('Sample Todo Content', 0);

```

This project was created using `bun init` in bun v1.0.23. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
