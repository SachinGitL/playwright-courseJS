import { expect } from "playwright/test"
export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastnameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetname = page.locator('[data-qa="delivery-address-street"]')
        this.postalcode = page.locator('[data-qa="delivery-postcode"]')
        this.cityinput = page.locator('[data-qa="delivery-city"]')
        this.countrydrowdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedaddressFirstname = page.locator('[data-qa="saved-address-firstName"]')
        this.savedaddressLastname = page.locator('[data-qa="saved-address-lastName"]')
        this.Savedstreetname = page.locator('[data-qa="saved-address-street"]')
        this.savedpostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.saveaddresscity = page.locator('[data-qa="saved-address-city"]')
        this.savedaddressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continuetopaymentbutton = page.getByRole('button', { name: 'Continue to payment' })
    }

    filldetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastnameInput.waitFor()
        await this.lastnameInput.fill(userAddress.lastname)
        await this.streetname.waitFor()
        await this.streetname.fill(userAddress.street)
        await this.postalcode.waitFor()
        await this.postalcode.fill(userAddress.postalcode)
        await this.cityinput.waitFor()
        await this.cityinput.fill(userAddress.city)
        await this.countrydrowdown.waitFor()
        await this.countrydrowdown.selectOption(userAddress.country)
        // await this.page.pause()
        // getByRole('textbox', { name: 'First name' })

    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.saveAddressContainer.waitFor()
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedaddressFirstname.first().waitFor()
        expect(await this.savedaddressFirstname.first().innerText()).toBe(await this.firstNameInput.inputValue())
        await this.savedaddressLastname.first().waitFor()
        expect(await this.savedaddressLastname.first().innerText()).toBe(await this.lastnameInput.inputValue())
        await this.Savedstreetname.first().waitFor()
        expect(await this.Savedstreetname.first().innerText()).toBe(await this.streetname.inputValue())
        await this.savedpostcode.first().waitFor()
        expect(await this.savedpostcode.first().innerText()).toBe(await this.postalcode.inputValue())
        await this.saveaddresscity.first().waitFor()
        expect(await this.saveaddresscity.first().innerText()).toBe(await this.cityinput.inputValue())
        await this.savedaddressCountry.first().waitFor()
        expect(await this.savedaddressCountry.first().innerText()).toBe(await this.countrydrowdown.inputValue())
        // await this.page.pause()    
          
    }   

    gotopayment = async() => {
        await this.continuetopaymentbutton.waitFor()
        await this.continuetopaymentbutton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    }
}