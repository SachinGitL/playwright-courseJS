import { test, expect } from "@playwright/test"
// const { test, expect } = require('@playwright/test');

test.skip("add product to basket", async ({ page }) => {
    await page.goto("/")
    // await page.pause()
    const addtoBasketButtn = page.locator('[data-qa="product-button"]').first()
    // const addtoBasketButtn = page.getByRole('button', { name: 'Add!!! to Basket' }).first()
    const Basketcounter = page.locator('[data-qa="header-basket-count"]')
    await addtoBasketButtn.waitFor()
    await expect(addtoBasketButtn).toHaveText("Add to Basket")
    await expect(Basketcounter).toHaveText("0")
    // await addtoBasketButtn.waitFor()
    await addtoBasketButtn.click()
    await expect(addtoBasketButtn).toHaveText("Remove from Basket")
    await expect(Basketcounter).toHaveText("1")
    const CheckOutTest = page.getByRole('link', { name: 'Checkout' })
    await CheckOutTest.waitFor()
    await CheckOutTest.click()
    // await page.pause()
    await page.waitForURL("/basket")
})

// const add_two_number = (a, b) => {
//     console.log("ddfdsf");
//     return a + b
// }