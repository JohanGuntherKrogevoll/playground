export { }

describe('Use name in greeting from azure function if logged in.', () => {
  it('passes', () => {
    cy.intercept('GET', '/.auth/me', { fixture: 'easyauth-me.json' }).as('auth')
    cy.visit('/')
    cy.wait('@auth')
    cy.contains('Say hi to Azure functions').click()
    cy.dataCy('greeting').should('contain', 'Hello Test Testesen! This is a message from Azure functions.')
  })
})

describe('Hello World in greeting form azure function if not logged in', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('Say hi to Azure functions').click()
    cy.dataCy('greeting').should('contain', 'Hello world! This is a message from Azure functions.')
  })
})
