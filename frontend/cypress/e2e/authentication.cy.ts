export { }

describe('Show login option when not authenticated', () => {
  it('passes', () => {
    cy.intercept('GET', '/.auth/me', { statusCode: 404 })
    cy.visit('/')
    cy.dataCy('authHeader').should('contain', 'Log in')
  })
})

describe('Show greeting when authenticated', () => {
  it('passes', () => {
    cy.intercept('GET', '/.auth/me', { fixture: 'easyauth-me.json' })
    cy.visit('/')
    cy.dataCy('authHeader').should('contain', 'Hi Test Testesen')
  })
})