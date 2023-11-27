it('Delete non-existing entity', () => {
    cy.request({
        method: 'DELETE',
        url: '/posts/897',
        failOnStatusCode: false,
    }).then(response => {
        expect(response.status).to.eq(404);
    })
});