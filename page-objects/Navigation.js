import { isDesktopViewport } from "./../utils/isDesktopViewport.js"

export class Navigation {
constructor(page) {
    this.page = page
    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.chekoutLink = page.getByRole('link', { name: 'Checkout' })
    this.burgerMenuButton = page.locator('[data-qa="burger-button"]')
}

  getBasketCount = async () => {
        // return number
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        // "0" -> 0
        return parseInt(text, 10)
    }

    // true if desktop and false is mobile
    gotoCheckout = async () => {
    // if mobile viewport, first open the burge menu
    if(!isDesktopViewport(this.page)) {
        await this.burgerMenuButton.waitFor()
        await this.burgerMenuButton.click()
    }
    // const CheckOutTest = page.getByRole('link', { name: 'Checkout' })
    await this.chekoutLink.waitFor()
    await this.chekoutLink.click()
    await this.page.waitForURL("/basket")
    // await this.page.pause()
    }


}