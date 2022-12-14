import { Person } from './person.model';

describe('Test for person', () => {

    let person: Person;

    beforeEach(() => {
        person = new Person('Carlos', 'Alvarez', 38, 40, 1.65);
    })

    it('should contain atributes', () => {
        expect(person.name).toEqual('Carlos');
        expect(person.lastName).toEqual('Alvarez');
        expect(person.age).toEqual(38);
    })

    describe('test for calcIMC', () => {

        it('should return a string: down', () => {
            //Arrange
            person.weight = 40;
            person.height = 1.65;
            //Act
            const rta = person.calcIMC();
            //Assert
            expect(rta).toEqual('down');
        })

        it('should return a string: normal', () => {
            //Arrange
            person.weight = 58;
            person.height = 1.65;
            //Act
            const rta = person.calcIMC();
            //Assert
            expect(rta).toEqual('normal');
        })


    })


})