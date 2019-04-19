before('successfully loads', function () {
    cy.isAlive()
    .then((alive) => { 
        expect(alive.status).to.eq(200)
        expect(alive.body).to.have.property('isDebug').eq(false)
     })
})


//does autorization service work?
const apikey = Cypress.env('apiKey1'); // <-- User1 autorization token is loaded
describe('Checkinig the autorization service', function () {
    it('unautorized user - no token', function () {
        cy.getWallets()
            .then((w) => { expect(w.status).to.eq(401) })
    })

    it('unautorized - invalid token', function () {
        cy.getWallets('abracadabra')
            .then((w) => { expect(w.status).to.eq(401) })
    })

    it('autorized user - valid token', function () {
        cy.getWallets(apikey)
            .then((w) => { expect(w.status).to.eq(200) })
    })
})