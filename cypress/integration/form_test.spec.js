describe('Pizza Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    });

    it('Name Input', () => {
        cy.get('[id="name-input"]')
            .type('fakenameisfake')
            .should('have.value', 'fakenameisfake')

    })

    it('Toppings', () => {
        cy.get('[id="pepperoni"]')
            .check()
            .should('be.checked')
        cy.get('[id="sausage"]')
            .check()
            .should('be.checked')
        cy.get('[id="ham"]')
            .check()
            .should('be.checked')
        cy.get('[id="pineapple"]')
            .check()
            .should('be.checked')
    })

    it('Size', () => {
        cy.get('[id="size-dropdown"]')
            .select('l')
    })

    it('Form Submit', () => {
        cy.get('[id="name-input"]')
            .type('fakenameisfake')
            .should('have.value', 'fakenameisfake')
        cy.get('[id="size-dropdown"]')
            .select('l')
        cy.get('[id="order-button"]')
            .click()
        cy.url().should('include', "/Confirmed")

    })
})