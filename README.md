# Для запуска автотестов необходимо:

## Склонировать репозиторий
```git clone <тут ваш URL>```

## Перейти во внутрь репозитория
```cd <тут название репозитория>```

## Установить зависимости
```npm install```

## Внесите свои логин и пароль в тесты
```строчки await loginPage.login('Тут ваш логин', 'Тут ваш пароль');```

## Запуск автотестов через команды желательно в той же последовательности что указана ниже, в ином случае при отсутствие созданного "Issue 1" будут падать "check" и "delete"

```npx playwright test createIssuePage.test.ts```</br>
```npx playwright test checkIssue.test.ts```</br>
```npx playwright test deleteIssue.test.ts```

#### P.S. Открытие репозитория иногда флакует, больно зато правда

## Генерируем отчеты Allure
```npm run allure:generate```

## Открываем отчет Allure
```npm run allure:open```