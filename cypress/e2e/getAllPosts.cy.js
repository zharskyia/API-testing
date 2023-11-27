it('Find all posts', () => {
    cy.request({
        method: 'GET',
        url: '/posts',
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.eq('application/json; charset=utf-8');
    });
});