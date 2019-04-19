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
            return response
        })
})

Cypress.Commands.add('killAllOrders', (apikey) => {
    cy
        .request({
            url: '/Orders', // cancell all orders
            method: 'DELETE',
            headers: { 'api-key': apikey },
        })
        .then((response) => {
            return response
        })
})

Cypress.Commands.add('getWallets', (apikey) => {
    cy
        .request({
            url: '/wallets', // get user's balance
            headers: { 'api-key': apikey },
            failOnStatusCode: false
        })
        .then((response) => {
            return response
        })
})

Cypress.Commands.add('postLO', (apikey, body) => {
    cy
        .request({
            url: '/orders/v2/limit', // place limit order
            headers: { 'api-key': apikey },
            method: 'POST',
            body: body
        })
        .then((response) => {
            return response
        })
})

Cypress.Commands.add('cancelById', (apikey, limitOrderId) => {
    cy
        .request({
            url: '/Orders/' + limitOrderId, // cancell the order
            method: 'DELETE',
            headers: { 'api-key': apikey },
        })
        .then((response) => {
            return response
        })
})

Cypress.Commands.add('getById', (apikey, limitOrderId) => {
    cy
        .request({
            url: '/Orders/' + limitOrderId, // get the order from history
            method: 'GET',
            headers: { 'api-key': apikey },
        })
        .then((response) => {
            return response
        })
})