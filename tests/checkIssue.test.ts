import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { issuePage } from '../pages/issuePage';
import { allure } from 'allure-playwright';

test.describe('Проверка Issues', () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub');
    allure.feature('Issues');
    allure.story('Проверка созданного Issue');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Тут ваш логин', 'Тут ваш пароль');
  });

  test('Проверить, что тестовая запись создалась и она есть в списке Issues', async ({ page }) => {
    const checkIssuePage = new issuePage(page);

    await test.step('Открыть репозиторий', async () => {
      await checkIssuePage.openRepo('forTestVk/GH');
      await page.waitForNavigation();
    });

    await test.step('Открыть таб Issues', async () => {
      await checkIssuePage.openIssues();
    });

    await test.step('Проверить, что созданная issue отображается в списке Issues', async () => {
      const issueTitle = page.locator('a[data-hovercard-type="issue"]').filter({ hasText: 'Issue 1' }).first();
      await expect(issueTitle.first()).toBeVisible();
      await page.locator('a[data-hovercard-type="issue"]').filter({ hasText: 'Issue 1' }).first().click();

      const issueDescription = page.getByRole('cell', { name: 'Я нашел баг' });
      await expect(issueDescription).toBeVisible();

      const issueLabel = page.locator('#partial-discussion-sidebar').getByRole('link', { name: 'bug' });
      await expect(issueLabel).toBeVisible();

      const issueAssignee = page.getByLabel('Select assignees').getByRole('link', { name: 'forTestVk', exact: true });
      await expect(issueAssignee).toBeVisible();
    });
  });
});
