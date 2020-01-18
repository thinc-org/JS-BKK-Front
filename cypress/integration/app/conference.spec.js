/// <reference types="Cypress" />

describe('Conference page', () => {
  it('displays the latest announcement', () => {
    // Reset announcement text.
    cy.visit('/prototype/conference.html');
    cy.queryByText(/This is an announcement!/).should('exist');
  });
  it('can display links in announcement', () => {
    // Reset announcement text.
    cy.visit('/prototype/conference.html');
    cy.queryByText('feedback').should('match', 'a[href]');
  });
  it('has a tweet button');
  it('displays schedule');
  it('updates the announcement in real-time');
});
