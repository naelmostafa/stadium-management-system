import { HelperFunction } from '../../utils';
describe('Helper fuctions Test', () => {
    it('should validate email', () => {
        const email: string = "test.com";
        const result: boolean = HelperFunction.validateEmail(email);
        expect(result).toBe(false);
    });
});
