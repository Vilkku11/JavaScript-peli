describe('Visiting the page',  () => {
    it('Main menu is shown', () => {
        cy.visit('http://127.0.0.1:5500/');
    
        cy.get('#main-menu-text').contains('Main Menu');
        cy.get('#play-btn').contains('Play Game');
        cy.get('#instructions-btn').contains('Instructions');
        cy.get('#settings-btn').contains('Game Settings');
        cy.get('#top-h1').contains('TOP3');
    });    
});

describe('Testing button functionality', () => {
    it('Instructions and Settings are shown', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.get('#main-menu-text').contains('Main Menu');
        cy.get('#instructions-btn').contains('Instructions').click();
        cy.get('#instructionsDiv').contains('Click arrow keys to move around');
        cy.get('#back-btn-1').click();
        cy.get('#settings-btn').contains('Game Settings').click();
        cy.get('#settingsDiv').contains('no Settings;');
        cy.get('#back-btn-2').click();
    })
})


describe('Game should launch on click', () => {
    it('The play button is clicked', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.get('#play-btn').contains('Play Game').click();
        cy.get('#gameCanvas')
        .should('be.visible')
        .click()
        .type('{leftarrow}', {release: false})
        .wait(5000)
        .type('{leftarrow}', {release: true});
      
      
    })
})


describe('Backend Test', () => {
    it('should resolve a Promise', () => {
      cy.wrap(fetch('http://localhost:3001/api/scores/'))
        .its('ok')
        .should('be.true')
    })
  })
