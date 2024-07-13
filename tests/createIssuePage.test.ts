import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { issuePage } from "../pages/issuePage";
import { allure } from "allure-playwright";

test.describe("Создание Issue", () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub');
    allure.feature('Issues');
    allure.story('Создание нового Issue');
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Тут ваш логин', 'Тут ваш пароль');
  });

  test("Создать issue с названием “Issue 1” и описанием “Я нашел баг”", async ({ page, }) => {
    const createIssuePage = new issuePage(page);

    await test.step("Открыть репозиторий", async () => {
      await createIssuePage.openRepo("forTestVk/GH");
      await page.waitForNavigation();
    });

    await test.step("Открыть таб Issues", async () => {
      await createIssuePage.openIssues();
    });

    await test.step('Нажать на кнопку "New issues"', async () => {
      await createIssuePage.newIssue();
    });

    await test.step("Ввести данные для issue", async () => {
      await createIssuePage.fillIssue("Issue 1", "Я нашел баг", "forTestVk");
    });

    await test.step('Нажать кнопку "Submit new issue"', async () => {
      await createIssuePage.submitIssue();
      await page.waitForNavigation();
    });

    await test.step("Проверить создание issue", async () => {
      const issueTitle = page.locator("bdi").getByText("Issue 1").first();
      await expect(issueTitle).toBeVisible();
    });
  });
});