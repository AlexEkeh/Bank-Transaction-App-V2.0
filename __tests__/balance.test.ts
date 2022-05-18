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


describe('Testing /balance GET', () => {
    it('Throw error when user is not authenticated', async () => {

        const response = await request(app)
        .get('/balance')

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error')
    });

    it('Returns all accounts for authenticated user', async () => {

        const token = await (global as any).auth();

        // MAIN TEST
        const response = await request(app)
        .get("/balance")
        .set('Cookie', [`jwt=${token}`])


        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('previous');
        expect(response.body).toHaveProperty('next');
        expect(response.body.data).not.toBeNull();
        expect(response.body.data).not.toBeUndefined();
    });

})