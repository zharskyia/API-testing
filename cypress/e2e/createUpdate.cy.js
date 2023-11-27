import someData from '../fixtures/someData.json'
import { faker } from '@faker-js/faker'

let token3;
let postId;
it('Create post entity and update the created entity', () => {

    const registerData = {
        email: someData.email = faker.internet.email({ provider: 'fakeMail.com' }),
        password: someData.password = faker.internet.password({ lenth: 8 })
    };
    cy.request({
        method: 'POST',
        url: '/register',
        body: registerData
    }).then((response) => {

        expect(response.body["accessToken"])

        token3 = response.body["accessToken"]

        const createData = {
            userId: someData.userId = faker.number.userId,
            id: someData.id = faker.number.id,
            title: someData.title = faker.word.title,
            body: someData.body = faker.lorem.body
        };

        cy.request({
            method: 'POST',
            url: '/posts',
            body: {
                userId: someData.userId,
                id: someData.id,
                title: someData.title,
                body: someData.body
            },
            headers: {
                Authorization: `Bearer ${token3}`
            }
        }).then((response) => {

            expect(response.body["id"]);
            postId = response.body["id"];
            cy.log(response.body);

            cy.request({
                method: 'PUT',
                url: `/posts/${postId}`,
                body: {
                    userId: someData.userId,
                    id: someData.id,
                    title: someData.title,
                    body: someData.body
                },
                headers: {
                    Authorization: `Bearer ${token3}`
                }
            }).then((response) => {

                expect(response.status).to.eq(200);
                cy.log(response.body);
            });
        });
    });
});