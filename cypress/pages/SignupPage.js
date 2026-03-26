class SignupPage {
  
  get fullname() {
    return cy.xpath("//input[@name='fullName']");
  }
  get email() {
    return cy.xpath("//input[@type='email']");
  }
  get phonenumber() {
    return cy.xpath("//input[@placeholder='Enter your phone number']");
  }
  get password() {
    return cy.xpath("(//input[@type='password'])[1]");
  }
  get continueButtonOne() {
    return cy.xpath("(//button[normalize-space()='Continue'])[1]");
  }
  get vehicalModel() {
    return cy.xpath("//input[contains(@placeholder,'Enter vehicle model')]");
  }
  get year() {
    return cy.xpath("//input[@placeholder='Enter manufacturing year']");
  }
  get colour() {
    return cy.xpath("//input[@placeholder='Enter vehicle colour']");
  }
  get modification() {
    return cy.xpath(
      "//textarea[@placeholder='Describe any modifications or customizations...']",
    );
  }
  get uploadImage() {
    return cy.xpath("//input[@type='file']");
  }
  get continueButtonTwo() {
    return cy.xpath("(//button[normalize-space()='Continue'])[1]");
  }
  get reason() {
    return cy.xpath(
      "//textarea[contains(@placeholder,'Tell us about your passion, experience, and why you want to become part of LOG...')]",
    );
  }
  get submitButton() {
    return cy.xpath("(//button[normalize-space()='Submit'])[1]").should('be.visible');
  }

  visit() {
    cy.visit(`${Cypress.config("baseUrl")}/become-member`);
  }

  fillFullName(value) {
    this.fullname.clear().type(value);
  }

  fillEmail(value) {
    this.email.clear().type(value);
  }

  fillPhoneNumber(value) {
    this.phonenumber.clear().type(value);
  }

  fillPassword(value) {
    this.password.clear().type(value);
  }

  clickContinueButtonOne() {
    this.continueButtonOne.click();
  }

  fillVehicalModel(value) {
    this.vehicalModel.clear().type(value);
  }

  fillYear(value) {
    this.year.clear().type(value);
  }

  fillColour(value) {
    this.colour.clear().type(value);
  }

  fillModification(value) {
    this.modification.clear().type(value);
  }

  fillUploadImage(value) {
    this.uploadImage.selectFile(value, { force: true });
  }

  clickContinueButtonTwo() {
    this.continueButtonTwo.click();
  }

  fillReason(value) {
    this.reason.clear().type(value);
  }

  clickSubmitButton() {
    this.submitButton.click();
  }
}

export default SignupPage;
