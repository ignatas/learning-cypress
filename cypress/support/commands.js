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
    cy
        .request('/isAlive')
        .then((response) => {
            //expect(response.status).to.eq(200);
            //expect(response.body).to.have.property('isDebug', true)
            return response.body.isDebug
        })
})

Cypress.Commands.add('killAllOrders', (apikey) => {
    cy
        .request({
            url: '/Orders', // cancell all orders
            method: 'DELETE',
            headers: { 'api-key': apikey },
        })
})

Cypress.Commands.add('getWallets', (apikey) => {
    cy
        .request({
            url: '/wallets', // get user's balance
            headers: { 'api-key': apikey },
        })
        .then((wallets) => {
            return wallets
        })
})