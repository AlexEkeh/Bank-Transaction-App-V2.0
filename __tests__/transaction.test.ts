import request from "supertest";
import app from '../src/server/app';
import mongoose from 'mongoose';


afterAll( async () => { 
    await mongoose.connection.close() 
});


// GENERATES TEST TOKEN
(global as any).auth = async () => {
    
    const result = await request(app)
    .post('/user/login')
    .send({
        email: "alex@gmail.com",
        password: "password"
    })
    const token = result.body.token;
    return token
}


describe('Testing /transaction GET', () => {
    it('Throw error when user is not authenticated', async () => {

        const response = await request(app)
        .get('/transaction')

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error')
    });

    it('Returns all transactions for authenticated user', async () => {

        const token = await (global as any).auth();

        // MAIN TEST
        const response = await request(app)
        .get("/transaction")
        .set('Cookie', [`jwt=${token}`])


        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('previous');
        expect(response.body).toHaveProperty('next');
        expect(response.body.data).not.toBeNull();
        expect(response.body.data).not.toBeUndefined();
    });

})



describe('Testing /transfer POST', () => {
  
    it('Throw error when user is not authenticated', async () => {

        const response = await request(app)
        .get('/transaction')

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error')
    });


    it('Makes a successful transfer for authenicated users', async () => {

        const token = await (global as any).auth();

        // MAIN TEST
        const response = await request(app)
        .post("/transfer")
        .send({
            senderAccount: "1202940299", 
            amount: 10000,
            receiverAccount: "6214595346",
        })
        .set('Cookie', [`jwt=${token}`])


        expect(response.body).toHaveProperty('reference');
        expect(response.body).toHaveProperty('senderAccount');
        expect(response.body).toHaveProperty('receiverAccount');
        expect(response.body).toHaveProperty('amount');
        expect(response.body).toHaveProperty('transferDescription');
        expect(response.statusCode).toBe(200);
      
    });
})