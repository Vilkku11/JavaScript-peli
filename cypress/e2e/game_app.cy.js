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
        cy.get('#instructionsDiv').should('be.visible');
        cy.get('#back-btn-1').click();
        cy.get('#settings-btn').contains('Game Settings').click();
        cy.get('#settingsDiv').should('be.visible');
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
        .wait(2000)
        .type('{leftarrow}', {release: true}); 
    })
})

describe('Should change the speed and lose the game', () => {
    it('Changing settings and testing Restart', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.get('#settings-btn').contains('Game Settings').click();
        cy.get('#gravity').invoke('val', 1).trigger('input');
        cy.get('#maxYSpeed').invoke('val', 5).trigger('input');
        cy.get('#saveSettings').click();
        cy.get('#back-btn-2').click();
        cy.get('#play-btn').contains('Play Game').click();
        cy.get('#gameCanvas').should('be.visible').wait(1000);
        cy.get('#gameOverCard').should('be.visible');
        cy.get('#mainMenuButton').should('be.visible');
        cy.get('#retryButton').should('be.visible');
        cy.get('#highScores').should('be.visible');
        cy.get('#retryButton').click().wait(1000);
    })
})

describe('Changing settings and trying the Menu Button', () => {
    it('Testing main menu button', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.get('#settings-btn').contains('Game Settings').click();
        cy.get('#gravity').invoke('val', 1).trigger('input');
        cy.get('#maxYSpeed').invoke('val', 5).trigger('input');
        cy.get('#saveSettings').click();
        cy.get('#back-btn-2').click();
        cy.get('#play-btn').contains('Play Game').click();
        cy.get('#gameCanvas').should('be.visible').wait(1000);
        cy.get('#mainMenuButton').click().wait(1000);
    })
})

describe('Backend Test', () => {
    it('should resolve a Promise', () => {
      cy.wrap(fetch('http://localhost:3001/api/scores/'))
        .its('ok')
        .should('be.true')
    })
  })
