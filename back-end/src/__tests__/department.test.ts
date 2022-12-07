import supertest from "supertest";
import app from "../utils/app";
import {clear, connect, close} from "./config/database";
import {Types} from "mongoose";
import {department_model} from "../models/department.model";
import {mock_department} from "./config/fake_data";

describe('Department',  () =>{
    jest.setTimeout(30000);

    beforeAll(async () => await connect());
    afterEach(async () => await clear());
    afterAll(async () => await close());

    describe('/get_one /:id', () => {
        describe('given the department doesn\'t exist' , () => {
            it('should return 404', async () => {
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app).get(`/api/department/${id}`);
                expect(statusCode).toBe(404);
            });
        })
        describe('given the department exist' , () => {
            it('should return 200', async () => {
                // await user_model.create(mock_user);
                const temp_depart = await department_model.create(mock_department);
                const {statusCode} = await supertest(app).get(`/api/department/${temp_depart._id}`);
                expect(statusCode).toBe(200);
            });
        })
    })

    describe('/get_all', () => {
        describe('given the database is empty', () => {
            it('should return 404', async () => {
                const {statusCode} = await supertest(app).get('/api/department');
                expect(statusCode).toBe(404);
            });
        })

        describe('given the database is NOT empty', () => {
            it('should return 200', async () => {
                await department_model.create(mock_department);
                const {statusCode} = await supertest(app).get('/api/department');
                expect(statusCode).toBe(200);
            });
        })
    })
});
