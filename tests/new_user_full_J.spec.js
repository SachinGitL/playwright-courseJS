import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid"
import { ProductPage } from "../page-objects/ProductPage"
import { Navigation } from "./../page-objects/Navigation.js"
import { Checkout } from "./../page-objects/Checkout.js"
import { LoginPage } from "./../page-objects/LoginPage.js"
import { RegisterPage } from "./../page-objects/RegisterPage.js"
import { DeliveryDetails } from "./../page-objects/DeliveryDetails.js"
import { deliverDetails as userAddress } from "./../Data/deliveryDetails.js"
import { PaymentPage } from "./../page-objects/PaymentPage"
import { paymentDetails as UserPayment } from "./../Data/paymentDetails.js"

test("New User full end to end test journey", async ({ page }) => {
    
const productPage = new ProductPage(page)
await productPage.visit()
await productPage.sortByCheapest()
await productPage.addProductToBasket(0)
await productPage.addProductToBasket(1)
await productPage.addProductToBasket(2)
const navigation = new Navigation(page)
await navigation.gotoCheckout()
const checkout = new Checkout(page)
await checkout.removeCheapestProduct()

await checkout.continueToCheckout()

const login = new LoginPage(page)
await login.moveToSignup()


const registerPage = new RegisterPage(page)
const email = uuidv4() + "@gmail.com"
const password = uuidv4()
await registerPage.signAsNewUser(email, password)

const deliveryDetails = new DeliveryDetails(page)
await deliveryDetails.filldetails(userAddress)
await deliveryDetails.saveDetails()

await deliveryDetails.gotopayment()

const paymentpage = new PaymentPage(page)
await paymentpage.activatediscount()
await paymentpage.fillpaymentdetails(UserPayment)
await paymentpage.completePayment()
})