import SignupPage from "../../pages/SignupPage";

describe("Signup", () => {
  beforeEach(function () {
    cy.fixture("signUp.json").then(function (d) {
      this.data = d;
    });
  });

  it("Signup with valid credentials", function () {
    const signUp = new SignupPage();
    signUp.visit();
    signUp.fillFullName(this.data.fullName);
    const email = `dacv696+${Cypress._.random(10, 999)}${Date.now()}@gmail.com`;
    signUp.fillEmail(email);
    signUp.fillPhoneNumber(this.data.phoneNumber);
    signUp.fillPassword(this.data.password);
    signUp.clickContinueButtonOne();
    signUp.fillVehicalModel(this.data.vehicalModel);
    signUp.fillYear(this.data.year);
    signUp.fillColour(this.data.colour);
    signUp.fillModification(this.data.modification);
    signUp.fillUploadImage("cypress/fixtures/1990.jpeg");
    signUp.clickContinueButtonTwo();
    signUp.fillReason(this.data.reason);
    signUp.clickSubmitButton();
  });
});
