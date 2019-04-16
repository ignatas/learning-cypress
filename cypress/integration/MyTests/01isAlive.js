//is service alive at all?
describe('GETisAlive', function () {
  it('successfully loads', function () {
    cy
      .request('/isAlive')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('isDebug', false)
      })


  })
})