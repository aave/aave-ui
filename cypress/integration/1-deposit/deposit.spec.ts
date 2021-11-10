/// <reference types="cypress" />

describe('deposit', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/#/deposit');
  });

  it('can deposit', () => {
    const eth = cy.get('[alt="ETH"]');

    eth.click();

    cy.get('.AmountField__input input').type('100');

    cy.get('.BasicForm').contains('Continue').click();
    // cy.get('.TxConfirmationView').contains('Approve').click();
    cy.get('.Button').contains('Deposit').click();
    cy.get('.Menu').contains('dashboard').click();

    cy.get('.DashboardTable__content')
      .find('.Value__value')
      .invoke('text')
      .then(parseFloat)
      .should('be.gte', 100);
  });
});