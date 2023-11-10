require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());


// CORS Middleware: Sets headers to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//app.use('/blog', blogRoutes);
app.use('/auth', authRoutes);


// Error Handling Middleware: Handles any errors that occur in the application
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


// MongoDB Connection: Connects to MongoDB using the connection string from the environment variables
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    j: true
  }
}
)
  .then(result => {
    console.log('Connected to MongoDB successfully!');
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

