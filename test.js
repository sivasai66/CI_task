const http = require('http');
const assert = require('chai').assert;

const app = require('./app'); // Import your app.js file

describe('App', function () {
    let server;

    // Before running the tests, start the HTTP server
    before(function () {
        server = http.createServer(app).listen(3000); // Assuming your app runs on port 3000
    });

    // After all tests, close the server
    after(function () {
        server.close();
    });

    it('should return "Hello, Jenkins CI/CD!"', function (done) {
        // Send a request to the server
        http.get('http://localhost:3000', function (response) {
            let data = '';

            // Collect the response data
            response.on('data', function (chunk) {
                data += chunk;
            });

            // Check the response
            response.on('end', function () {
                assert.strictEqual(data, 'Hello, Jenkins CI/CD!\n');
                done();
            });
        });
    });
});

