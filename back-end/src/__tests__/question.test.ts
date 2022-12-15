import {clear, close, connect} from "./config/database";
import {Types} from "mongoose";
import supertest from "supertest";
import app from "../utils/app";
import {question_model} from "../models/question.model";
import {mock_question} from "./config/fake_data";

describe('Question',  () => {
    jest.setTimeout(20000);

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
                const tmp_question = await question_model.create(mock_question).catch(e => console.log(e));
                const {statusCode} = await supertest(app).get(`/api/question/${tmp_question?._id}`);
                expect(statusCode).toBe(200);
            });
        })
    })

    describe('/get_all', () => {
        describe('given the database is empty', () => {
            it('should return 404', async () => {
                const {statusCode} = await supertest(app).get('/api/question');
                expect(statusCode).toBe(404);
            });
        })

        describe('given the database is NOT empty', () => {
            it('should return 200', async () => {
                const tmp_question = await question_model.create(mock_question).catch(e => console.log(e));
                const {statusCode} = await supertest(app).get('/api/question');
                expect(statusCode).toBe(200);
            });
        })
    })

});