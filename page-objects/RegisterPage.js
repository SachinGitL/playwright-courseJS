export class RegisterPage {
constructor(page) {
    this.page = page
    this.emailinput = page.getByPlaceholder('e-mail')
    this.passwordinput = page.getByPlaceholder('password')
    this.registerButton = page.getByRole('button', { name: 'register' })
}

signAsNewUser = async (email, password) => {
    await this.emailinput.waitFor()
    await this.emailinput.fill(email)
    await this.passwordinput.waitFor()
    await this.passwordinput.fill(password)
    await this.registerButton.waitFor()
    await this.registerButton.click() 
}
}