
import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./../utils/isDesktopViewport.js"

// const isDesktopViewport = (page) => {
//     const size = page.viewportSize()
//     return size.width >= 600
//     // return true or false
// }


export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }
    visit = async () => {
    await this.page.goto("/")
    }


    addProductToBasket = async (index) => {
        // const addButtons = this.page.locator('[data-qa="product-button"]')
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        // onlyt desktop viewport
        let basketCounterBeforeAdding
        if (isDesktopViewport(this.page)) {
           basketCounterBeforeAdding = await navigation.getBasketCount() 
        }
        
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        // only destop viewport
        if(isDesktopViewport(this.page)) {
        const basketCounterAfterAdding = await navigation.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
        }
    }

    sortByCheapest = async () => {
        await this.sortropdown.waitFor()
        // get order of products 
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortropdown.selectOption("price-asc")
        const productTitleafterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleafterSorting).not.toEqual(productTitleBeforeSorting)
        // get order of the products
        // expected list of product different
        // await this.page.pause()
    }

}