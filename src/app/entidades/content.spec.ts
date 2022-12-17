import {Content} from './content';

// One form of writting tests
describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('Você recebeu uma solicitação de amizade');
    
        expect(content).toBeTruthy();
    });
    
    it('should not be able to create a notification content with less than 5 characters', () => {
        expect(() => new Content('Você')).toThrow();
    });
    
    it('should not be able to create a notification content with more than 240 characters', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
})


// Another form of writting tests

/* test('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
});

test('it should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Você')).toThrow();
});

test('it should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
}); */