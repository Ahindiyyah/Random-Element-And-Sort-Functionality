/// <reference types="cypress" />
import 'cypress-xpath';

describe('Magento Test', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/gear/fitness-equipment.html')
    });
    it('Adding Random Items', () => {
        RandomItems();
    });

    it('Asserting The Sort Functionality is Working', () => {
        SortFunctionality();
    });
});


function RandomItems() {
    cy.xpath('//ol[@class="products list items product-items"]/li').its('length').then((TheLength) => {
        for (let i = 0; i < 3; i++) {
            const Randomindex = Math.floor(Math.random() * TheLength)
            cy.xpath('//ol[@class="products list items product-items"]/li').eq(Randomindex).click()
            cy.get('#product-addtocart-button').click().should('have.attr', 'title', 'Adding...')
            cy.go(-1)
        }
    })
}

function SortFunctionality() {
    cy.get(':nth-child(4) > .toolbar-sorter > #sorter').select('price');
    cy.get('#product-price-21 > .price').invoke('text').then((TextOfTheFirstItem) => {
        cy.get('#to-46 > .price').invoke('text').then((TextOfTheLastItem) => {
            const firstItemPrice = parseFloat(TextOfTheFirstItem.replace('$', ''));
            const lastItemPrice = parseFloat(TextOfTheLastItem.replace('$', ''));
            expect(lastItemPrice).to.be.greaterThan(firstItemPrice);
        })
    })
}