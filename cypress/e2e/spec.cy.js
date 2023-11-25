describe('API tests', () => {
  it('Find all posts', () => {
    cy.request({
      method: 'GET',
      url: '/posts'
    }).then(response => {
      expect(response.status).to.eq(200);
    })

  })
});

it('Get only first 10 posts', () => {
  cy.request({
    method: 'GET',
    url: '/posts&limit=10'
  }).then(response => {
    expect(response.status).to.eq(200);
  })

});

it('Get only first 10 posts', () => {
  cy.request({
    method: 'GET',
    url: '/posts&limit=10'
  }).then(response => {
    expect(response.status).to.eq(200);
  })

})
