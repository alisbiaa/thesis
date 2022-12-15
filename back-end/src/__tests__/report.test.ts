import {clear, close, connect} from "./config/database";
import {Types} from "mongoose";
import supertest from "supertest";
import app from "../utils/app";
import {mock_report} from "./config/fake_data";
import {report_model} from "../models/report.model";

describe('Report', () => {
    jest.setTimeout(20000);

    beforeAll(async () => await connect());
    afterEach(async () => await clear());
    afterAll(async () => await close());

    describe('/get_one :id', () => {
        describe('given the report doesn\'t exist' , () => {
            it('should return 404', async () => {
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app).get(`/api/report/${id}`);
                expect(statusCode).toBe(404);
            });
        })

        describe('given the report exist' , () => {
            it('should return 200', async () => {
                const tmp_report = await report_model.create(mock_report);
                const {statusCode} = await supertest(app).get(`/api/report/${tmp_report._id}`);
                expect(statusCode).toBe(200);
            });
        })

    })
})