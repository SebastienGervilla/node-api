const express = require('express');
const app = express();

require ('./models/dbConfig');
const PostsRoutes = require('./controllers/postsController');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/posts', PostsRoutes);

app.listen(5500, () => console.log("Server started: 5500"));