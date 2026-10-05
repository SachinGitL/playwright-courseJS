import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemove = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckOutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itermsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allpricetext = await this.basketItemPrice.allInnerTexts()
        
        const justNumber = allpricetext.map((element) => {
            const withoutDollorSign = element.replace("$","")
            return parseInt(withoutDollorSign, 10)
            // console.warn({element})
            
        })
        // console.warn({allpricetext})
        // console.warn({justNumber})
        const smallestPrice = Math.min(justNumber)
        const smallestPriceIDx = justNumber.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemove.nth(smallestPriceIDx) 
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itermsBeforeRemoval - 1)
        // await this.page.pause()
    }

    continueToCheckout = async () => {
        await this.continueToCheckOutButton.waitFor()
        await this.continueToCheckOutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})

    }
}