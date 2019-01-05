const { validate } = require('../../../models/shifts');

describe('shift.validateShift', () => {
    it('should validate shift and date fields', () => {
        const shifts = [{
            date: new Date(),
            shift: 'morning' 
        }];
        const { error } = validate(shifts);
        expect(error).toBeNull();
    });

    it('should return error because shift is missing', () => {
        const shifts = [{
            date: new Date()
        }];
        const { error } = validate(shifts);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('shift');
        expect(error.details[0].message).toMatch('required');
    });

    it('should return error because shift is not morning or evening', () => {
        const shifts = [{
            date: new Date(),
            shift: 'night'
        }];
        const { error } = validate(shifts);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('shift');
        expect(error.details[0].message).toMatch('morning');
    });

    it('should return error because date is not iso formatted', () => {
        const shift = [{
            date: '2018-09-11 20',
            shift: 'evening'
        }];
        const { error } = validate(shift);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('date');
        expect(error.details[0].message).toMatch(/iso/i);
    });
});