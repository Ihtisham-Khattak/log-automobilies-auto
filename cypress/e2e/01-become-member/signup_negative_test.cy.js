import SignupPage from "../../pages/SignupPage";

describe("Signup - Negative Test Cases", () => {
  let validData;
  let invalidData;

  beforeEach(function () {
    cy.fixture("signUp.json").then((d) => {
      validData = d;
    });
    cy.fixture("signUpInvalid.json").then((d) => {
      invalidData = d;
    });
  });

  // ─── TC-N01: Empty Full Name ───────────────────────────────────────────────
  it("TC-N01: Should NOT proceed when Full Name is empty", function () {
    const signUp = new SignupPage();
    signUp.visit();

    // Leave full name empty, fill everything else valid
    signUp.fillEmail(validData.email);
    signUp.fillPhoneNumber(validData.phoneNumber);
    signUp.fillPassword(validData.password);
    signUp.clickContinueButtonOne();

    // Should stay on Step 1 — full name field should still be visible
    signUp.fullname.should("be.visible");
  });

  // ─── TC-N02: Invalid Email Format ─────────────────────────────────────────
  it("TC-N02: Should NOT proceed when Email format is invalid", function () {
    const signUp = new SignupPage();
    signUp.visit();

    signUp.fillFullName(validData.fullName);
    signUp.fillEmail(invalidData.invalidEmail); // e.g. "notanemail@"
    signUp.fillPhoneNumber(validData.phoneNumber);
    signUp.fillPassword(validData.password);
    signUp.clickContinueButtonOne();

    // Should stay on Step 1 — email field should still be visible
    signUp.email.should("be.visible");
  });

  // ─── TC-N03: Weak / Too Short Password ────────────────────────────────────
  it("TC-N03: Should NOT proceed when Password is too weak (less than 8 chars)", function () {
    const signUp = new SignupPage();
    signUp.visit();

    signUp.fillFullName(validData.fullName);
    signUp.fillEmail(`dacv696+neg03${Date.now()}@gmail.com`);
    signUp.fillPhoneNumber(validData.phoneNumber);
    signUp.fillPassword(invalidData.weakPassword); // e.g. "1234"
    signUp.clickContinueButtonOne();

    // Should stay on Step 1 — password field should still be visible
    signUp.password.should("be.visible");
  });

  // ─── TC-N04: Invalid Phone Number (non-numeric) ───────────────────────────
  it("TC-N04: Should NOT proceed when Phone Number contains invalid characters", function () {
    const signUp = new SignupPage();
    signUp.visit();

    signUp.fillFullName(validData.fullName);
    signUp.fillEmail(`dacv696+neg04${Date.now()}@gmail.com`);
    signUp.fillPhoneNumber(invalidData.invalidPhoneNumber); // e.g. "abcXYZ!@#"
    signUp.fillPassword(validData.password);
    signUp.clickContinueButtonOne();

    // Should stay on Step 1 — phone number field should still be visible
    signUp.phonenumber.should("be.visible");
  });

  // ─── TC-N05: Already Registered Email ────────────────────────────────────
  it("TC-N05: Should NOT register when Email is already in use", function () {
    const signUp = new SignupPage();
    signUp.visit();

    signUp.fillFullName(validData.fullName);
    signUp.fillEmail(invalidData.alreadyRegisteredEmail); // already registered
    signUp.fillPhoneNumber(validData.phoneNumber);
    signUp.fillPassword(validData.password);
    signUp.clickContinueButtonOne();
    signUp.fillVehicalModel(validData.vehicalModel);
    signUp.fillYear(validData.year);
    signUp.fillColour(validData.colour);
    signUp.fillModification(validData.modification);
    signUp.fillUploadImage("cypress/fixtures/1990.jpeg");
    signUp.clickContinueButtonTwo();
    signUp.fillReason(validData.reason);
    signUp.clickSubmitButton();

    // Should show an error — still on signup page, NOT redirected to dashboard/success
    cy.url().should("include", "become-member");
  });
});
