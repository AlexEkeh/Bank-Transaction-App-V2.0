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




describe('Throws Error when name, email or password is not provided', () => {
    it('throws error when inputs are not valid/available', async () => {

        const response = await request(app)
        .post('/user/register')
        .send({
            name: "test",
            email: "test@com",
            password: "password"
        })

        expect(response.statusCode).toBe(400);
        expect(response.body[0]).toHaveProperty("message");
    })
})



describe('Testing auth Login', () => {
    it('Logs in successfully', async () => {

        const response = await request(app)
        .post('/user/login')
        .send({
            email: "alex@gmail.com",
            password: "password"
        })
        .expect(200)

        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('status')
    })
})


describe('Testing auth Logout', () => {

    it('Logs out successfully', async () => {

        const token = await (global as any).auth();

        // MAIN TEST
        const response = await request(app)
        .get("/user/logout")
        .set('Cookie', [`jwt=${token}`])

        expect(response.body).toHaveProperty('message');
        expect(response.body).toEqual({
            message: "Logout successful!"
        });
     
    })
})