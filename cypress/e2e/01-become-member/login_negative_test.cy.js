import LoginPage from "../../pages/LoginPage";

describe("Login Functionality - Comprehensive Tests", () => {
  let validData;
  let invalidData;
  const login = new LoginPage();

  beforeEach(function () {
    cy.fixture("login.json").then((d) => {
      validData = d;
    });
    cy.fixture("loginInvalid.json").then((d) => {
      invalidData = d;
    });
  });

  // ─── Positive Scenarios ───────────────────────────────────────────────────
  it("TC-L01: Should login successfully with valid credentials", function () {
    login.visit();
    login.loginEmail(validData.email);
    login.loginPassword(validData.password);
    login.loginButton();
    // Assuming successful login redirects to dashboard or changes URL
    cy.url().should("not.include", "login"); 
  });

  // ─── Negative Scenarios ───────────────────────────────────────────────────
  it("TC-L02: Should NOT login with an unregistered email", function () {
    login.visit();
    login.loginEmail(invalidData.invalidEmail);
    login.loginPassword(validData.password);
    login.loginButton();
    // Should show error message and stay on login page
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-L03: Should NOT login with an incorrect password", function () {
    login.visit();
    login.loginEmail(validData.email);
    login.loginPassword(invalidData.invalidPassword);
    login.loginButton();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-L04: Should NOT login with an empty email", function () {
    login.visit();
    // Ensure email is empty
    login.loginPassword(validData.password);
    login.loginButton();
    login.email.should("have.attr", "required");
  });

  it("TC-L05: Should NOT login with an empty password", function () {
    login.visit();
    login.loginEmail(validData.email);
    login.loginButton();
    login.password.should("have.attr", "required");
  });

  it("TC-L06: Should NOT login with invalid email format", function () {
    login.visit();
    login.loginEmail(invalidData.invalidEmailFormat);
    login.loginPassword(validData.password);
    login.loginButton();
    // Browser or app validation should trigger
    login.email.invoke('prop', 'validationMessage').should('not.be.empty');
  });

  // ─── Edge Case Scenarios ──────────────────────────────────────────────────
  it("TC-L07: Should handle extremely long email address gracefully", function () {
    login.visit();
    login.loginEmail(invalidData.longEmail);
    login.loginPassword(validData.password);
    login.loginButton();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-L08: Should handle leading/trailing spaces in email", function () {
    login.visit();
    login.loginEmail(`  ${validData.email}  `);
    login.loginPassword(validData.password);
    login.loginButton();
    cy.log("Checking login with spaces in email");
  });

  // ─── Security Scenarios ───────────────────────────────────────────────────
  it("TC-L09: Should NOT be vulnerable to SQL Injection in email field", function () {
    login.visit();
    login.loginEmail(invalidData.sqlInjection);
    login.loginPassword(validData.password);
    login.loginButton();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-L10: Should NOT be vulnerable to SQL Injection in password field", function () {
    login.visit();
    login.loginEmail(validData.email);
    login.loginPassword(invalidData.sqlInjection);
    login.loginButton();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-L11: Should use a generic error message for failed login", function () {
    login.visit();
    login.loginEmail(invalidData.invalidEmail);
    login.loginPassword(invalidData.invalidPassword);
    login.loginButton();
    // Security best practice: don't reveal if email or password was wrong
    cy.contains("Invalid credentials").should("be.visible");
    cy.contains("User not found").should("not.exist");
    cy.contains("Incorrect password").should("not.exist");
  });

  it("TC-L12: Should verify password field masks the input", function () {
    login.visit();
    login.password.should("have.attr", "type", "password");
  });
});
