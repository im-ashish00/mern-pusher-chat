import express from "express";

const app = express();
const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.status(200).send("Hello world!!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
