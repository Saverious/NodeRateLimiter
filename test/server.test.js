import { expect } from 'chai';
import axios from 'axios';
import { url } from './server.js';

// send http request
async function sendReq () {
    try {
        let res = await axios.get(url);
        const data = {
            statusCode: res.status,
            statusData: res.data
        };

        expect(res.status).to.equal(200);
        console.log('request success: ', data);
    } catch (e) {
        const data = {
            statusCode: e.response.status,
            statusText: e.response.statusText
        };

        console.log('request failed: ', data);
    }
}

// tests
describe('*** make http requests ***', () => {
    it('sends http request every 1 second', () => {
        setInterval(() => {
            sendReq();
        }, 1000);
    });
});

