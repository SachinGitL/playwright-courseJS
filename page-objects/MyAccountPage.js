export class MyAccountPage {
    constructor(page) {
        this.page = page
        this.myAccountheading = page.getByRole('heading', { name: 'My Account' })
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto("/my-account")
        // await this.page.pause()
    }

    waitForPageHeading = async () => {
        await this.myAccountheading.waitFor()
    }

    waitforErrorMessage = async () => {
        await this.errorMessage.waitFor()
    }
}