// Import required modules
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');

// Create an Express application
var app = express();
app.use(cors());

// MongoDB connection string and database name
var CONNECTION_STRING = 'mongodb+srv://admin:start@product.3hksavb.mongodb.net/?retryWrites=true&w=majority&appName=product';
var DATABASE_NAME = 'todoappdb';
var database;

// Start the Express server on port 5039
app.listen(5039, () => {
    // Connect to MongoDB using MongoClient
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
        } else {
            // If connection is successful, set the 'database' variable to the connected database
            database = client.db(DATABASE_NAME);
            console.log("Mongo DB Connection Successful");
        }
    });
});

// Define a route to get notes from the 'todoappcollection'
app.get('/api/todoapp/GetNotes', (request, response) => {
    database.collection('todoappcollection').find({}).toArray((error, result) => {
        response.send(result);
    });
});

// Define a route to add a new note to the 'todoappcollection'
app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
    // Count the number of documents in the 'todoappcollection'
    database.collection('todoappcollection').count({}, function (error, numOfDocs) {
             database.collection('todoappcollection').insertOne({
            id: (numOfDocs + 1).toString(),
            description: request.body.newNote // Corrected key to 'newNote'
        });
        response.json('Added Successfully');
    });
});

// Define a route to delete a note from the 'todoappcollection'
app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    database.collection('todoappcollection').deleteOne({
        id: request.query.id
    });
     response.json('Delete Successfully');
});
