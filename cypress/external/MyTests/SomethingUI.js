//tbd
const login = Cypress.env('login');
const password = Cypress.env('password');
let cookie;
describe('Open homepage', function () {
    beforeEach('visit the homepage', () => {
        if (cookie) {
            cy.visit('http://localhost:8080/', { failOnStatusCode: false, headers: { 'Cookie': cookie.name + '=' + cookie.value } })
        }
        else {cy.visit('http://localhost:8080/', { failOnStatusCode: false })}
    })
    it('successfully loads', function () {
        //cy.visit('http://localhost:8080/', { failOnStatusCode: false })
        cy.url().should('include', 'login')
        cy.get('div[id="loginIntroDefault"]').should('have', 'logo')
            .find('h1').should('contain', 'Welcome to Jenkins!')

    })
    it('successfully logs in', function () {
        //cy.visit('http://localhost:8080/', { failOnStatusCode: false })
        cy.get('input[name="j_username"]')
            .type(login)
            .should('have.value', login)
        cy.get('input[name="j_password"]')
            .type(password)
            .should('have.value', password)
        cy.get('div[class="Checkbox-indicator"]')
            .click()
        cy.get('input[class="submit-button primary"]')
            .click()

        cy.url().should('equal', 'http://localhost:8080/')
        cy.get('a[class="model-link inside inverse"]')
            .find('b').should('contain', login)

        cy.getCookie('ACEGI_SECURITY_HASHED_REMEMBER_ME_COOKIE').then((c) => { cookie = c })
    })
    it('', () => { 
        //cy.visit('http://localhost:8080/', { failOnStatusCode: false, headers: { 'Cookie': cookie.name + '=' + cookie.value } 
     })
})

