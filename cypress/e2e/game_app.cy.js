describe('Visiting the page',  () => {
    it('Main menu is shown', () => {
        cy.visit('http://127.0.0.1:5500/');
    
        cy.contains('Main Menu');
        cy.contains('Play Game');
        cy.contains('Instructions');
        cy.contains('Game Settings');
        cy.contains('TOP3');
    });    
});

describe('Testing button functionality', () => {
    it('Instructions and Settings are shown', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.contains('Instructions').click();
        cy.contains('Click arrow keys to move around');
        cy.get('#back-btn-1').click();
        cy.contains('Game Settings').click();
        cy.contains('no Settings;');
        cy.get('#back-btn-2').click();
    })
})


describe('Game should launch on click', () => {
    it('The play button is clicked', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.contains('Play Game').click();
        cy.get('#gameCanvas').click();
        cy.get('#gameCanvas').trigger('keydown', { keyCode: 37, which: 37 });
        cy.wait(5000);
        cy.get('#gameCanvas').trigger('keyup', { keyCode: 37, which: 37 });
    })
})


describe('Backend Test', () => {
    it('should resolve a Promise', () => {
      cy.wrap(fetch('http://localhost:3001/api/scores/'))
        .its('ok')
        .should('be.true')
    })
  })

/*

            <h1>Main Menu</h1>
            <div class="btn-group">
                <button id="play-btn">Play Game</button>
                <button id="instructions-btn">Instructions</button>
                <button id="settings-btn">Game Settings</button>*/