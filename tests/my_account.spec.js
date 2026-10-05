
// import * as dotenv from "dotenv"
// dotenv.config()
import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "./../Data/userDetails.js"



test("My Account using Cookie Injection and mocking network request", async ({ page }) => {
    // make a nework request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    console.warn({loginToken})
    await page.route("**/api/user**", async(route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWIRGHT ERROR FROM MOCKING"})
        })
    })
    
    // Inject the login token into the browser
    const MyAccount = new MyAccountPage(page)
    await MyAccount.visit()
    // await page.pause()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await MyAccount.visit()
    // await page.pause()
    await MyAccount.waitForPageHeading()
    await MyAccount.waitforErrorMessage()
})



