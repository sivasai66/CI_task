const http = require('http');
const chai = require('chai');
const expect = chai.expect;

// Import your app.js file
const app = require('./app');

// Describe the test suite
describe('App.js', () => {
    let server;

    before(() => {
        // Start the server before running tests
        server = app.server;
    });

    after(() => {
        // Close the server after running tests
        app.close();
    });

    // Test case for checking if the server is running
    it('should start the server', (done) => {
        const PORT = process.env.PORT || 3000;

        // Make a request to the server
        http.get(`http://localhost:${PORT}`, (res) => {
            // Check if the response status code is 200
            expect(res.statusCode).to.equal(200);

            // Read the response data
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Check the response data
            res.on('end', () => {
                expect(data).to.equal('Hello, Jenkins CI/CD!\n');
                done();
            });
        });
    });

    // Test case for checking a non-existent route
    it('should return 404 for a non-existent route', (done) => {
        const PORT = process.env.PORT || 3000;

        // Make a request to a non-existent route
        http.get(`http://localhost:${PORT}/nonexistent`, (res) => {
            // Check if the response status code is 404
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});

