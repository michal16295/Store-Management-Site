const { ValidateNewProduct } = require('../../../models/product');

describe('product.validateNewProduct', () => {
    it('should validate new product fields', () => {
        const product = {
            id: 1,
            name: 'Item 1',
            buyingPrice: 1000,
            sellingPrice: 2000
        };
        const { error } = ValidateNewProduct(product);
        expect(error).toBeNull();
    });
    it('should return error because id is missing', () => {
        const product = {
            name: 'Item 1',
            buyingPrice: 1000,
            sellingPrice: 2000
        };
        const { error } = ValidateNewProduct(product);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('id');
        expect(error.details[0].message).toMatch('required');
    });

    it('should return error because name is 1 character', () => {
        const product = {
            id: 1,
            name: 'I',
            buyingPrice: 1000,
            sellingPrice: 2000
        };
        const { error } = ValidateNewProduct(product);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('name');
        expect(error.details[0].message).toMatch('length');
    });

    it('should return error because selling price is negative formatted', () => {
        const product = {
            id: 1,
            name: 'Item 1',
            buyingPrice: 1000,
            sellingPrice: -2000
        };
        const { error } = ValidateNewProduct(product);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toMatch('sellingPrice');
        expect(error.details[0].message).toMatch('larger');
    });
});