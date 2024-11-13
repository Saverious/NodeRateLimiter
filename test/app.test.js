const { app, sum } = require('./app');
const request = require('supertest');


test('allows request to be served', () => {
    request(app)
    .get('/user')
    .expect(200)
    .end((err, res) => {
        if(err) throw err
    });
});

// test('expect 1 + 3 = 4', () => {
//     expect(sum(1, 3)).toBe(4);
// });