const request = require('supertest');
const app = require('../app');
const { mongoConnect, mongoDisconnect } = require('../middleware/dbCoonect');

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await mongoDisconnect();  
});

describe('Test GET /api/transaksi', () => {
    test('should respond with 200 success', async () => { 
        const response = await request(app)
        .get('/api/transaksi')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test GET /api/transaksi/:id', () => {
    test('should respond with 200 success', async () => { 
        const transactionId = '651186f0fbb5985f7abe40e0';
        const response = await request(app)
        .get(`/api/transaksi/${transactionId}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test GET /api/saldo', () => {
    test('should respond with 200 success', async () => { 
        const response = await request(app)
        .get('/api/saldo')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test POST /api/auth/register', () => {
    test('should respond with 201 Created for a valid registration', async () => {
        //  Change the data everytime run the test
        const userData = {
            username: 'newuser1',
            email: "newuser1@gmail.com",
            password: 'newuser1',
            // Other required registration data
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(201)
            .expect('Content-Type', /json/);
        
        // You can add more assertions to check the response data if needed
    });

    test('should respond with 500 Internal Server Error for an duplicate registration', async () => {
        const userData = {
            // Invalid or incomplete registration data
            username: 'newuser1',
            email: "newuser1@gmail.com",
            password: 'newuser1',
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(500);
    });

    test('should respond with 403 Forbidden for an invalid registration', async () => {
        const userData = {
            // Invalid or incomplete registration data
            username: 'newuser1',
            email: "newuser1@gmail.com",
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(403);
    });

    test('should respond with 403 Forbidden for an invalid registration', async () => {
        const userData = {
            // Invalid or incomplete registration data
            username: 'newuser1',
            password: 'newuser1',
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(403);
    });

    // You can add more test cases for edge cases or specific scenarios as needed
});

describe('Test POST /api/auth/login', () => {
    test('should respond with 200 success', async () => { 
        const loginData = {
            username: "seller1",
            password: "seller1",
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('should respond with 400 Bad Request', async () => { 
        const loginData = {
            username: "seller1",
            password: "12313",
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(400);
    });

    test('should respond with 404 Not Found', async () => { 
        const loginData = {
            username: "12313",
            password: "seller1",
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(404);
    });
});

describe('Test POST /api/transaksi/new', () => {
    test('should respond with 201 Created for a valid transaksi', async () => {
        //  Change the data everytime run the test
        const userData = {
            saldo: [
                { 
                    id_rekening: 4,
                    nama: "Roldell"
                }
            ],
            jenis_transaksi: "Debit",
            nominal: 100
        };

        const response = await request(app)
            .post('/api/transaksi/new')
            .send(userData)
            .expect(201)
            .expect('Content-Type', /json/);
        
        // You can add more assertions to check the response data if needed
    });

    // You can add more test cases for edge cases or specific scenarios as needed
});

describe('Test PUT /api/transaksi/update/:id', () => {
    test('should respond with 200 success', async () => { 
        const transactionId = '651186f0fbb5985f7abe40e0'; // Replace with the actual ID of the transaction to update
        const updatedData = {
            jenis_transaksi: "kredit",
            nama: "rondhell"
        };

        const response = await request(app)
            .put(`/api/transaksi/update/${transactionId}`)
            .send(updatedData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('should respond with 403 forbiden', async () => { 
        const transactionId = '651186f0fbb5985f7abe40e0'; // Replace with the actual ID of the transaction to update
        const updatedData = {
            jenis_transaksi: "wew",
            nama: "rondhell"
        };

        const response = await request(app)
            .put(`/api/transaksi/update/${transactionId}`)
            .send(updatedData)
            .expect(403);
    });
});

describe('Test DELETE /api/transaksi/delete/:id', () => {
    test('should respond with 200 success', async () => { 
        const transactionId = '6533ecdc3894dafd4b41cce1'; // Replace with the actual ID of the transaction to delete

        const response = await request(app)
            .delete(`/api/transaksi/delete/${transactionId}`)
            .expect(200);
    });
});

describe('Test POST /api/saldo/add', () => {
    test('should respond with 201 Created for a valid new saldo', async () => {
        const userData = {
            id_rekening: 2,
            nama: "Rondhel",
            current_saldo: 10000
        };

        const response = await request(app)
            .post('/api/saldo/add')
            .send(userData)
            .expect(201)
            .expect('Content-Type', /json/);
        
    });
});