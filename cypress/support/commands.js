// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('isAlive', () => {
    return cy.request('/isAlive').then((alive) => {
        expect(alive.status).to.eq(200)
        expect(alive.body).to.have.property('isDebug').eq(false)
    })
})

Cypress.Commands.add('killAllOrders', (apikey) => {
    return cy.request({
        url: '/Orders', // cancell all orders
        method: 'DELETE',
        headers: { 'api-key': apikey },
    })
})

Cypress.Commands.add('getWallets', (apikey) => {
    return cy.request({
        url: '/wallets', // get user's balance
        headers: { 'api-key': apikey },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('postLimitOrder', (apikey, body) => {
    return cy.request({
        url: '/orders/v2/limit', // place limit order
        headers: { 'api-key': apikey },
        method: 'POST',
        body: body
    })
})

Cypress.Commands.add('cancelOrderById', (apikey, limitOrderId) => {
    return cy.request({
        url: '/Orders/' + limitOrderId, // cancell the order
        method: 'DELETE',
        headers: { 'api-key': apikey },
        failOnStatusCode: false
    })
})

let retryDuration = 0;
Cypress.Commands.add('getOrderById', (apikey, limitOrderId) => {
    cy.request({
        url: '/Orders/' + limitOrderId, // get the order from history
        method: 'GET',
        headers: { 'api-key': apikey },
        failOnStatusCode: false
    })
        .then((order) => {
            retryDuration = retryDuration + parseInt(order.duration);
            if (retryDuration < 3000) {
                if (order.status === 404) {
                    console.log(retryDuration)
                    cy.getOrderById(apikey, limitOrderId)
                }
                else {
                    //cy.writeFile('/cypress/fixtures/getOrderByIdResponse.json', ordersbyid) <-- no need to use
                }
            }
            else { expect(retryDuration).to.be.lessThan(3000) }
        })
})

Cypress.Commands.add('getProducts',() => {
    cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json').then(response => {
        let products = response.body.products
        products = products.filter(product => (product.display_name.indexOf(' -') == -1))
        return products
    })
}) 