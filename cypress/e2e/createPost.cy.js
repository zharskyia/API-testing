it('Create a post', () => {
    cy.request({
        method: 'POST',
        url: '/664/posts',
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eq(401);
    })
});