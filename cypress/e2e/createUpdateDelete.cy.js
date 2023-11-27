import someData from '../fixtures/someData.json'
import { faker } from '@faker-js/faker'

let token4;
let postId1;
it('Create post entity, update the created entity, and delete the entity', () => {

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
        cy.log(response.body);
        token4 = response.body["accessToken"]

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
                Authorization: `Bearer ${token4}`
            }
        }).then((response) => {

            expect(response.body["id"]);
            cy.log(response.body);
            postId1 = response.body["id"];

            cy.request({
                method: 'PUT',
                url: `/posts/${postId1}`,
                body: {
                    userId: someData.userId,
                    id: someData.id,
                    title: someData.title,
                    body: someData.body
                },
                headers: {
                    Authorization: `Bearer ${token4}`
                }
            }).then((response) => {

                expect(response.status).to.eq(200);
                cy.log(response.body);

                cy.request({
                    method: 'DELETE',
                    url: `/posts/${postId1}`,
                    headers: {
                        Authorization: `Bearer ${token4}`
                    }
                }).then((response) => {

                    expect(response.status).to.eq(200);
                    cy.log(response.body);

                    cy.request({
                        method: 'GET',
                        url: `/posts/${postId1}`,
                        failOnStatusCode: false,
                        headers: {
                            Authorization: `Bearer ${token4}`
                        }
                    }).then((response) => {

                        expect(response.status).to.eq(404);
                        cy.log(response.body);
                    });
                });
            });
        });
    });
});
