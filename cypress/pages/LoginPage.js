class LoginPage {
  get email() {
    return cy.xpath("//input[@placeholder='Enter your email address']");
  }

  get password() {
    return cy.xpath("//input[@placeholder='Enter your password']");
  }

  get login() {
    return cy.xpath("//button[@type='submit']");
  }

  visit() {
    cy.visit(Cypress.config("baseUrl"));
  }

  loginEmail(email) {
    this.email.clear().type(email);
  }
  loginPassword(password) {
    this.password.clear().type(password);
  }
  loginButton(){
    this.login.click().should("have.text", "Sign In");
  }
}

export default LoginPage;
