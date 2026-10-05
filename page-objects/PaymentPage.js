import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountcode = page.frameLocator('[data-qa="active-discount-container"]')
                                 .locator('[data-qa="discount-code"]')
      // new element for the discount inout    
        this.discountinput = page.getByPlaceholder('Discount code')
        this.activateDiscountbutton = page.locator('[data-qa="submit-discount-button"]')
        this.totalvalue = page.locator('[data-qa="total-value"]')
        this.discountvalue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountactiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditcardownerInput = page.getByPlaceholder("Credit card owner")
        this.creditcardnumber = page.getByPlaceholder("Credit card number")
        this.creditcarduntilinput = page.getByPlaceholder("Valid until")
        this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC")
        this.paymentclick = page.locator('[data-qa="pay-button"]')
            
        
    }

    activatediscount = async() => {
        await this.discountcode.waitFor()
        const code = await this.discountcode.innerText()
        // wait to see that input contains the value which was entered
        await this.discountinput.waitFor()
        //Option 1 for laggy inputs: using .fill with await expect() 
        // need to fill out the discount input
        await this.discountinput.fill(code)
        // wait to see that the input contains the value which we entered
        // expect(await this.discountinput.inputValue()).toBe(code)
        await expect(this.discountinput).toHaveValue(code)
        
        // // Option 2 for laggy inputs: slow typing.
        // await this.discountinput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountinput.inputValue()).toBe(code)
        expect(await this.discountvalue.isVisible()).toBe(false)
        expect(await this.discountactiveMessage.isVisible()).toBe(false)
        await this.activateDiscountbutton.waitFor()
        await this.activateDiscountbutton.click()
        // check that it displays "discuount activated"
        await this.discountactiveMessage.waitFor()
        // check that there is now discount is price showing
        await this.discountvalue.waitFor()
        const discountvaluetext = await this.discountvalue.innerText() //345$
        const discountvalueonlyStringNumber = discountvaluetext.replace("$","")
        const discountvalueNumber = parseInt(discountvalueonlyStringNumber,10)

        await this.totalvalue.waitFor()
        const totalvaluetext = await this.totalvalue.innerText() //345$
        const totalvalueonlyStringNumber = totalvaluetext.replace("$","")
        const totalvalueNumber = parseInt(totalvalueonlyStringNumber,10)
        // check that the discount price applied and new discount smaller than actual one
        expect(discountvalueNumber).toBeLessThan(totalvalueNumber) 
    }

    fillpaymentdetails = async (UserPayment) => {
        await this.creditcardownerInput.waitFor()
        await this.creditcardownerInput.fill(UserPayment.owner)
        await this.creditcardnumber.waitFor()
        await this.creditcardnumber.fill(UserPayment.number)
        await this.creditcarduntilinput.waitFor()
        await this.creditcarduntilinput.fill(UserPayment.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(UserPayment.CVC)
        // await this.page.pause()
    }

    completePayment = async () => {
        await this.paymentclick.waitFor()
        await this.paymentclick.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })

    } 
}