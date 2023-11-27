import someData from '../fixtures/someData.json'
import { faker } from '@faker-js/faker'

someData.userId = faker.number.int({ min: 101, max: 500 });
someData.id = faker.number.int({ min: 101, max: 500 });
someData.title = faker.word.title;
someData.body = faker.lorem.body;

let token;
it('Create post with adding access token in header', () => {

    const registerData = {
        email: someData.email = faker.internet.email({ provider: 'fakeMail.com' }),
        password: someData.password = faker.internet.password({ lenth: 8 })
    }
    cy.request({
        method: 'POST',
        url: '/register',
        body: registerData
    }).then((response) => {

        expect(response.body["accessToken"])
        
        token = response.body["accessToken"]

        const createData = {
            userId: someData.userId = faker.number.userId,
            id: someData.id = faker.number.id,
            title: someData.title = faker.word.title,
            body: someData.body = faker.lorem.body
        };

        cy.request({
            method: 'POST',
            url: '/664/posts',
            body: createData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {

            expect(response.status).to.eq(201);
            cy.log(response.body);

        });
    });
});