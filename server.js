const http = require('http');  // Import the http module from Node.js
const fs = require('fs');  // Import the fs module to work with the file system
const path = require('path'); // Import the path module to handle and transform file paths
const url = require('url');  // Import the url module to parse URL addresses
const port = 3000; // Define the port number on which the server will listen

// Create an HTTP server that listens to server requests and returns a response
const server = http.createServer(function(req, res) {
    // If the request URL is the root path, serve the index.html file
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'}); // Set the response header for HTML content
        fs.readFile('index.html', function(error, data) { // Read the index.html file from the filesystem
            if (error) { // If there is an error reading the file
                res.writeHead(404); // Set the response header to 404 Not Found
                res.write('Error: File Not Found'); // Write the error message
            } else {
                res.write(data); // Write the content of index.html to the response
            }
            res.end(); // End the response
        });
    // If the request URL is /api/, return a JSON response
    } else if (req.url === '/api/') {
        res.writeHead(200, { 'Content-Type': 'application/json' }); // Set the response header for JSON content
        res.write(JSON.stringify({ message: 'Hello from the API!' })); // Write a JSON object as the response
        res.end(); // End the response
    // For all other request URLs, return a 404 Not Found response
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' }); // Set the response header for plain text content
        res.write('404 Not Found'); // Write the 404 Not Found message
        res.end(); // End the response
    }
});

// Start the server and listen on the specified port
server.listen(port, function(error) {
    if (error) { // If there is an error starting the server
        console.log('Something went wrong', error); // Log the error message
    } else {
        console.log(`Server running at http://localhost:${port}/`);  // Log a message when the server starts successfully
    }
});
