const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
    
const Film = mongoose.model('Film', { 
    title: String ,
    description: String ,
    image_url: String ,
    trailer_url: String ,
});

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.listen(3000, () => {
    console.log(`Server is running in http://localhost:${port}`);
    }
);