import supertest from "supertest";
import app from "../utils/app";
import {clear, connect, close} from "./config/database";
import {Types} from "mongoose";
import {department_model} from "../models/department.model";
import {subject_model} from "../models/subject.model";
import {mock_department, mock_subject} from "./config/fake_data";

describe('Subject',  () => {
    jest.setTimeout(30000);

    beforeAll(async () => await connect());
    afterEach(async () => await clear());
    afterAll(async () => await close());

    describe('/get_one /:id', () => {
        describe('given the subject doesn\'t exist' , () => {
            it('should return 404', async () => {
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app).get(`/api/subject/get_one/${id}`);
                expect(statusCode).toBe(404);
            });
        })
        describe('given the department exist' , () => {
            it('should return 200', async () => {
                // await user_model.create(mock_user);
                const temp_depart = await department_model.create(mock_department);
                const temp_subject = await subject_model.create(mock_subject);
                const {statusCode} = await supertest(app).get(`/api/subject/get_one/${temp_subject._id}`);
                expect(statusCode).toBe(200);
            });
        })
    })

    describe('/', () => {
        describe('given the database is empty', () => {
            it('should return 404', async () => {
                const {statusCode} = await supertest(app).get('/api/subject');
                expect(statusCode).toBe(404);
            });
        })

        describe('given the database is NOT empty', () => {
            it('should return 200', async () => {
                await subject_model.create(mock_subject);
                const {statusCode} = await supertest(app).get('/api/subject');
                expect(statusCode).toBe(200);
            });
        })
    })

    describe('/get_all/:id by department ID' , () => {
        describe('given the database is empty', () => {
            it('should return 404', async () => {
                const {statusCode} = await supertest(app).get('/api/subject/get_all');
                expect(statusCode).toBe(404);
            });
        })

        describe('given the database is NOT empty', () => {
            it('should return 200', async () => {
                await department_model.create(mock_department);
                await subject_model.create(mock_subject);
                const {statusCode} = await supertest(app).get(`/api/subject/get_all/${mock_subject.department_id}`);
                expect(statusCode).toBe(200);
            });
        })

    })
});
