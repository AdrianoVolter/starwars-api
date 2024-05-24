const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
    
const Film = mongoose.model('Film', { 
    title: String ,
    description: String ,
    image_url: String ,
    trailer_url: String ,
});

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

app.listen(3000, () => {
    console.log(`Server is running in http://localhost:${port}`);
    }
);