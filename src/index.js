const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const { Film } = require("./model/index");

app.use(express.json());

app.get("/", async (req, res) => {
  const films = await Film.find();
  res.send(films);
});

app.post("/", async (req, res) => {
  try {
    const film = new Film({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    });
    await film.save();
    res.send({
      message: "Film created successfully",
      film: film,
    });
  } catch (err) {
    res.status(400).send({
      message: "Error creating film",
      error: err.message,
    });
  }
});

app.delete("/:id", async (req, res) => {
    try{
  const film = await Film.findByIdAndDelete(req.params.id);
  if (!film)
    return res.status(404).send("The film with the given ID was not found.");
  res.send({
    message: "Film deleted successfully",
    film: film,
  });
} catch (err) {
    res.status(400).send({
      message: "Error deleting film",
      error: err.message,
    });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
      },
      { new: true }
    );
    if (!film)
      return res.status(404).send("The film with the given ID was not found.");
    res.send({
      message: "Film updated successfully",
      film: film,
    });
  } catch (err) {
    res.status(400).send({
      message: "Error updating film",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`Server is running in http://localhost:${port}`);
  mongoose
    .connect("mongodb://localhost/test")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB..."));
});
