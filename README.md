# Степ проект fe5stepnotes
[Задание](https://gitlab.com/dan-it/groups/fe5/tree/master/step-project-notes)

## Дополнительные требования к заданию
Приложение имеет одну главную html-страницу, на которой присутствуют следующие секции:
1. Заголовок с кнопками создания заметок.
2. Секция, в которой отображаются карточки всех заметок.
3. Модальное окно создания заметки.
4. Модальное окно редактирования заметки.
5. Модальное окно создания заметки со списком.
6. Модальное окно редактирования заметки со списком.

Все модальные окна изначально скрыты. Каждый студент формирует шаблоны для своих секций.

При каждом изменении в базе данных происходит получение данных и отрисовка страницы. 

Элементы коллекций отправляются на сервер с помощью AJAX-запросов jQuery.
По такому же механизму происходит получение конкретных карточек с сервера для заполнения полей модальной формы.

## Состав участников проекта
### Студент № 1
Николаенко Алексей

Phone Number	+38 (067) 527-23-72

Email	alex5272372@gmail.com

### Студент № 2
Дроздюк Алексей

Phone Number	+38 (073) 163-96-13

Email	samyner@ukr.net

### Студент № 3
Семеняк Сергей

Email	diagcome@gmail.com

## Список использованных технологий
### Сервис публикации приложений: Heroku
[Приложение](https://fe5stepnotes.herokuapp.com/)

[Администрирование](https://dashboard.heroku.com/apps/fe5stepnotes)

### База данных: MongoDB
[Администрирование](https://cloud.mongodb.com/v2/5cff8dc0cf09a2451565a0d8#clusters)

[Документация по Node.js драйверу](http://mongodb.github.io/node-mongodb-native/3.2/)

Имя базы данных: cards

#### Коллекция 1: notes
Элемент:
```json
{
    "themeNote": "...",
    "textNote": "..."
}
```

#### Коллекция 2: lists
Элемент:
```json
{
    "themeList": "...",
    "itemsList": [
        {
            "itemChecked": true,
            "itemText": "..."
        }
    ]
}
```

### Клиентский фреймворк: Bootstrap
[Документация](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

#### Компоненты:
1. Buttons
2. List group
3. Input group
4. Card
5. Modal

### Шаблонизатор: EJS
[Документация](https://ejs.co/#about)

### Веб-сервер: Node.js + Express
[Документация по Express](https://expressjs.com/ru/)

[Документация по body-parser](https://www.npmjs.com/package/body-parser)