import {clear, close, connect} from "./config/database";
import {Types} from "mongoose";
import supertest from "supertest";
import app from "../utils/app";
import {question_model} from "../models/question.model";
import {mock_question} from "./config/fake_data";

describe('Question',  () => {
    jest.setTimeout(30000);

    beforeAll(async () => await connect());
    afterEach(async () => await clear());
    afterAll(async () => await close());

    describe('get_one /:id', () => {
        describe('given the question doesn\'t exist' , () => {
            it('should return 404', async () => {
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app).get(`/api/question/${id}`);
                expect(statusCode).toBe(404);
            });
        })
        describe('given the department exist' , () => {
            it('should return 200', async () => {
                const tmp_question = await question_model.create(mock_question);
                const {statusCode} = await supertest(app).get(`/api/question/${tmp_question._id}`);
                expect(statusCode).toBe(200);
            });
        })
    })

    // describe('/', () => {
    //     describe('given the database is empty', () => {
    //         it('should return 404', async () => {
    //             const {statusCode} = await supertest(app).get('/api/subject');
    //             expect(statusCode).toBe(404);
    //         });
    //     })
    //
    //     describe('given the database is NOT empty', () => {
    //         it('should return 200', async () => {
    //             await subject_model.create(mock_subject);
    //             const {statusCode} = await supertest(app).get('/api/subject');
    //             expect(statusCode).toBe(200);
    //         });
    //     })
    // })

    // describe('/get_all/:id by department ID' , () => {
    //     describe('given the database is empty', () => {
    //         it('should return 404', async () => {
    //             const {statusCode} = await supertest(app).get('/api/subject/get_all');
    //             expect(statusCode).toBe(404);
    //         });
    //     })
    //
    //     describe('given the database is NOT empty', () => {
    //         it('should return 200', async () => {
    //             await department_model.create(mock_department);
    //             await subject_model.create(mock_subject);
    //             const {statusCode} = await supertest(app).get(`/api/subject/get_all/${mock_subject.department_id}`);
    //             expect(statusCode).toBe(200);
    //         });
    //     })
    //
    // })
});