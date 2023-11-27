it('Get posts with id = 55 and id = 60', () => {
    cy.request({
        method: 'GET',
        url: '/posts',
    }).then((response) => {
        const responseBody = response.body;
        const user55 = responseBody.filter((post) => post.id === 55);
        const user60 = responseBody.filter((post) => post.id === 60);

        expect(response.status).to.eq(200);
        cy.wrap(user55[0].id).should('eq', 55);
        cy.wrap(user60[0].id).should('eq', 60);
    });
});