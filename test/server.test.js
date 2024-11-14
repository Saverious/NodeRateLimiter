import { expect } from 'chai';
import axios from 'axios';
import app from './server.js';

// set global variables
let port, url;

// pre-run tests
beforeEach(() => {
    port = 3000;
    url = `http://localhost:${port}`;

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
});

// tests
describe('make request', () => {
    it('make http call to endpoint', async () => {
        const res = await axios.get(url);
        expect(res.status).to.equal(200);
    });
});

