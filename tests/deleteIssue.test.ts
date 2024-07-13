import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { issuePage } from "../pages/issuePage";
import { allure } from "allure-playwright";

test.describe("Удаление Issue", () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub');
    allure.feature('Issues');
    allure.story('Удаление Issue');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Тут ваш логин', 'Тут ваш пароль');
  });

  test("Удалить issue с названием “Issue 1”", async ({ page }) => {
    const deleteIssuePage = new issuePage(page);

    await test.step("Открыть репозиторий", async () => {
      await deleteIssuePage.openRepo("forTestVk/GH");
      await page.waitForNavigation();
    });

    await test.step("Открыть таб Issues", async () => {
      await deleteIssuePage.openIssues();
    });

    await test.step("Удалить issue", async () => {
      await deleteIssuePage.deleteIssue("Issue 1");
      await page.waitForNavigation();
    });

    await test.step("Проверить, что issue удалена", async () => {
      await deleteIssuePage.checkIssueNotExists("Issue 1");
    });
  });
});