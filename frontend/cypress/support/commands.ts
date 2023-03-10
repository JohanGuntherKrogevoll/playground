///<reference types="cypress" />
export {}

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})

declare global {
    namespace Cypress {
        interface Chainable {
            dataCy(value: string): Chainable<JQuery<HTMLElement>>
        }
    }
}