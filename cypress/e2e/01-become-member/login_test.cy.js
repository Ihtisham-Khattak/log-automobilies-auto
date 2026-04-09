import LoginPage from "../../pages/LoginPage";

describe("Login Page", () => {
  before(function () {
    cy.fixture("login").then(function (data) {
      this.data = data;
    });
  });

  const login = new LoginPage();
  it("Login with valid credentials", function () {
    login.visit();
    cy.get('a[href="/en/login"]').first().click();
    login.loginEmail(this.data.email);
    login.loginPassword(this.data.password);
    login.loginButton();
  });
});
