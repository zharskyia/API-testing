it('Get only first 10 posts', () => {
    cy.request({
        method: 'GET',
        url: '/posts?_limit=10',
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).has.length(10);
    });
});