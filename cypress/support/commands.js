// @ts-check
import '@testing-library/cypress/add-commands';

// https://on.cypress.io/custom-commands

/** @type {OurCustomCommands} */
const ourCustomCommands = {
  enterConferenceSection() {
    cy.visit('/prototype/conference.html');
  },
  resetAnnouncement() {},
  updateAnnouncement(text) {
    cy.window().then(window => {
      const element = window.document.getElementById('announcement');
      element.textContent = text;
    });
  }
};

for (const [key, value] of Object.entries(ourCustomCommands)) {
  Cypress.Commands.add(key, value);
}
