import { test, expect, Locator, Page} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('Авторизация на GitHub', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Открыть страницу авторизации', async () => {
    await loginPage.goto();
  });

  await test.step('Ввести логин и пароль', async () => {
    await loginPage.login('forTestVk', '@0tCaf>p+.hNDbNdEgGX');
  });

  await test.step('Проверить успешную авторизацию', async () => {
    await page.waitForNavigation();
    expect(page.url()).toBe('https://github.com/');
  });
});