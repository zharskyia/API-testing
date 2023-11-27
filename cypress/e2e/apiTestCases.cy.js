import someData from '../fixtures/someData.json'
import { faker } from '@faker-js/faker'

someData.email = faker.internet.email({ provider: 'fakeMail.com' });
someData.password = faker.internet.password({ lenth: 8 });
someData.userId = faker.number.int({ min: 101, max: 500 });
someData.id = faker.number.int({ min: 101, max: 500 });
someData.title = faker.word.title;
someData.body = faker.lorem.body;
someData.firstName = faker.person.firstName('male');
someData.lastName = faker.person.lastName('male');

it('Find all posts', () => {
    cy.request({
        method: 'GET',
        url: '/posts',
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.eq('application/json; charset=utf-8');
    })
});

it('Get only first 10 posts', () => {
    cy.request({
        method: 'GET',
        url: '/posts?_limit=10',
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).has.length(10)
    });
});

it('Get posts with id = 55 and id = 60', () => {
    cy.request({
        method: 'GET',
        url: '/posts',
    }).then((response) => {
        const responseBody = response.body;
        const user55 = responseBody.filter((post) => post.id === 55);
        const user60 = responseBody.filter((post) => post.id === 60);

        cy.wrap(user55[0].id).should('eq', 55);
        cy.wrap(user60[0].id).should('eq', 60);
    });
});

it('Create a post', () => {
    cy.request({
        method: 'POST',
        url: '/664/posts',
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eq(401);
    })
});

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

let token2;
it('Create post entity and verify that the entity is created', () => {

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

        token2 = response.body["accessToken"]

        const createData = {
            userId: someData.userId = faker.number.userId,
            id: someData.id = faker.number.id,
            title: someData.title = faker.word.title,
            body: someData.body = faker.lorem.body
        };

        cy.request({
            method: 'POST',
            url: '/posts',
            body: createData,
            headers: {
                Authorization: `Bearer ${token2}`
            }
        }).then((response) => {

            expect(response.status).to.eq(201);
            cy.log(response.body);
        });
    });
});

it('Update non-existing entity', () => {
        cy.request({
            method: 'PUT',
            url: '/posts/961',
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(404);
    })
});

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
                    cy.log(response);
                });
            });
        });
    });

it('Delete non-existing entity', () => {
        cy.request({
            method: 'DELETE',
            url: '/posts/897',
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(404);
    })
});


export function createUpdateDelete(someData) {
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

                    cy.request({
                        method: 'DELETE',
                        url: `/posts/${postId1}`,
                        headers: {
                            Authorization: `Bearer ${token4}`
                        }
                    }).then((response) => {

                        expect(response.status).to.eq(200);

                        cy.request({
                            method: 'GET',
                            url: `/posts/${postId1}`,
                            failOnStatusCode: false,
                            headers: {
                                Authorization: `Bearer ${token4}`
                            }
                        }).then((response) => {

                            expect(response.status).to.eq(404);
                        });
                    });
                });
            });
        });
    });
}