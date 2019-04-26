let apikey;
before('successfully loads', function () {
    cy.isAlive()
    cy.fixture('users').then((data) => { apikey = data[0].apikey }) // <-- User1 autorization token is loaded
cy.log('service is ready')
})


//does autorization service work?

describe('Checkinig the autorization service', function () {
    it('unautorized user - no token', function () {
        cy.getWallets()
            .then((wallets) => { expect(wallets.status).to.eq(401) })
    })

    it('unautorized - invalid token', function () {
        cy.getWallets('abracadabra')
            .then((wallets) => { expect(wallets.status).to.eq(401) })
    })

    it('autorized user - valid token', function () {
        cy.getWallets(apikey)
            .then((wallets) => { expect(wallets.status).to.eq(200) })
    })
})