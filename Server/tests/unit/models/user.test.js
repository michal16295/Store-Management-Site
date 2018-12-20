const { User, validate } = require('../../../models/users');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = { 
            _id: new mongoose.Types.ObjectId().toHexString(),
            id: 1,
            role: 'admin' 
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.secretKey());
        expect(decoded).toMatchObject(payload);
    });
});

describe('user.validateUser', () => {
    it('should validate user id and password fields', () => {
        const user = {
            id: 1,
            password: '12345' 
        };
        const { error } = validate(user);
        expect(error).toBeNull();
    });

    it('should return error because password is missing', () => {
        const user = {
            id: 1
        };
        const { error } = validate(user);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('password');
        expect(error.details[0].message).toMatch('required');
    });

    it('should return error because password is shorter than 5', () => {
        const user = {
            id: 1,
            password: '1234'
        };
        const { error } = validate(user);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('password');
        expect(error.details[0].message).toMatch('length');
    });

    it('should return error because id should be a number', () => {
        const user = {
            id: 'text',
            password: '12345'
        };
        const { error } = validate(user);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('id');
        expect(error.details[0].message).toMatch('number');
    });
});