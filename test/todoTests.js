const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../config/config');
const user = require('../controllers/userController');
const testData = require('./testData.json');
let requestDomain = require('../server');
chai.use(chaiHttp);
const mongoose = require('mongoose');
let apiUrl = `${config.app.prefix}/v1/`;
const todo = require('../models/activity');

describe('For todo Tests', () => {
    let token;
    before(async () => {
        const newUser = await chai.request(requestDomain).post(`${apiUrl}registeruser`).send(testData.userInfo);
        if (newUser.status === 200) {
            const obj = await chai.request(requestDomain).post(`${apiUrl}signin`).send({ email: testData.userInfo.email, password: testData.userInfo.password});
            token = obj.body.message.token;
        }
    })
    after(async () => {
        mongoose.connection.db.collection('users').remove({ email: testData.userInfo.email });
    })
    describe('create a todoActivity', () => {
        describe('test Joi Validations', () => {
            it('it should test joi valaidation when creating todo', async() => {
                if (token) {
                    const testactivityData = {...testData.activity};
                    testactivityData.activityName = "";
                    const nameErrResponse = await chai.request(requestDomain).post(`${apiUrl}createactivity`).set("authorization", token).send(testactivityData);
                    expect(nameErrResponse.status).equals(400);
                }
            });
            it('it should test joi valaidation when updating todo', async() => {
                if (token) {
                    const testactivityData = {...testData.updateActivity};
                    testactivityData.id = "";
                    const idErrResponse = await chai.request(requestDomain).put(`${apiUrl}updateactivity`).set("authorization", token).send(testactivityData);
                    expect(idErrResponse.status).equals(400);
                    testactivityData.id = "123";
                    testactivityData.activityName = "";
                    const activitynameErrResponse = await chai.request(requestDomain).put(`${apiUrl}updateactivity`).set("authorization", token).send(testactivityData);
                    expect(activitynameErrResponse.status).equals(400);
                }
            });
            it('it should test joi valaidation when deleting todo', async() => {
                if (token) {
                    const testactivityData = {...testData.deleteActivity};
                    testactivityData.id = "";
                    const idErrResponse = await chai.request(requestDomain).delete(`${apiUrl}deleteactivity/${testactivityData.id}`).set("authorization", token).send(testactivityData);
                    expect(idErrResponse.status).equals(404);
                }
            });
            
        })
        describe('test CRUD operation activity', () => {
            let createdActivity;
            after(async() => {
                todo.remove({ _id: createdActivity.body.obj._id }).exec();
            });
            it('should create a new todo activity', async() => {
                if (token) {
                    const testactivityData = {...testData.activity};
                    createdActivity = await chai.request(requestDomain).post(`${apiUrl}createactivity`).set("authorization", token).send(testactivityData);
                    expect(createdActivity.status).equals(200);
                    expect(createdActivity.body.obj.activityName).equals(testactivityData.activityName);
                }
            })

            it('should update the existing todo activity', async() => {
                if (token) {
                    const testactivityData = createdActivity.body.obj;
                    let updateData = {
                        id: testactivityData._id,
                        activityName: "update-activity",
                        description: "test"
                    }
                    const nameErrResponse = await chai.request(requestDomain).put(`${apiUrl}updateactivity`).set("authorization", token).send(updateData);
                    expect(nameErrResponse.status).equals(200);
                    expect(nameErrResponse.body.obj.activityName).equals(updateData.activityName);
                }
            })

            it('should delete the existing todo activity', async() => {
                if (token) {
                    const testactivityData = createdActivity.body.obj;
                    const id = testactivityData._id;
                    const nameErrResponse = await chai.request(requestDomain).delete(`${apiUrl}deleteactivity/${id}`).set("authorization", token).send();
                    expect(nameErrResponse.status).equals(200);
                    expect(nameErrResponse.body.obj.isDeleted).equals(true);
                }
            })
        })
    })
});

