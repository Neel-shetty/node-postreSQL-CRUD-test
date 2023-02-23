const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  const users = prisma.users.findMany()
  console.log("🚀 ~ file: index.js:20 ~ app.get ~ users:", users)
  response.json(users);
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
