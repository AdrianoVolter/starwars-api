const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const {Film} = require('./model/index');

app.use(express.json());
 
app.get('/', async(req, res) => {
    const films = await Film.find();
    res.send(films);
});

app.post("/",async(req ,res)=>{
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    });
    await film.save().then(() => console.log('Film saved in the database...'));
    res.status(201).send(film);
})

app.delete("/:id",async(req,res)=>{
    const film = await Film.findByIdAndDelete(req.params.id);
    if(!film) return res.status(404).send("The film with the given ID was not found.");
    res.send(film);
})

app.listen(3000, () => {
    console.log(`Server is running in http://localhost:${port}`);
    mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
    }
);