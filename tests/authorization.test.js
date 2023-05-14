const { test, expect } = require('@playwright/test');
const { email, password } = require('./user.js');

test.describe('Positive Test', () => {
  test('Valid email and password', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.screenshot({ path: 'screenshots/authorizationForm.png' });
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(password);
    await page.getByTestId('login-submit-btn').click();
    const titleText = await page.textContent('h2');
    await expect(page.getByRole('heading', { name: 'Мои курсы и профессии' })).toHaveText(titleText);
    await page.screenshot({ path: 'screenshots/profilePage.png' });
  });
});

test.describe('Negative Test', () => {
  test('Invalid email and password', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill("example@mail.ru");
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill("123456");
    await page.getByTestId('login-submit-btn').click();
    await page.screenshot({ path: 'screenshots/invalid.png' });
    await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
  });
});
