it('Update non-existing entity', () => {
    cy.request({
        method: 'PUT',
        url: '/posts/961',
        failOnStatusCode: false,
    }).then(response => {
        expect(response.status).to.eq(404);
    })
});