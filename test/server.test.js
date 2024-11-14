import { expect } from 'chai';
import axios from 'axios';
import app from './server.js';
import limiter from '../index.js';

// set global variables
let port, url;

// pre-run tests
beforeEach(() => {
    port = 3000;
    url = `http://localhost:${port}`;
});

// tests
describe('*** make http requests ***', () => {
    it('make consecutive http calls to endpoint', async () => {
        // set rate limiter middleware
        app.use(limiter({
            windowMS: 20,
            limit: 5
        }));

        // start server
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        });

        // make 10 consecutive requests
        for(let i = 0; i < 10; i++){
            let res = await axios.get(url);
            console.log('status code: ', res.status);
            expect(res.status).to.equal(200);
        }
    });
});

