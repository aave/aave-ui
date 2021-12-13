/// <reference types="cypress" />

describe.skip('markets', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://staging.aave.com/#/markets');
  });

  it('can switch between markets', () => {
    // Check if all markets are present
    cy.get('.SelectMarketPanel__markets', { timeout: 10000 })
      .children('button')
      .should('have.length.gt', 1);

    // select main market
    cy.get('.SelectMarketPanel__markets button').first().next().click();
  });
});
