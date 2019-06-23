const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

const renderCards = async res => {
    const cards = await db.getCards();
    res.render('pages/cards', {
        cards
    });
};

app.get('/cards', async function(req, res) {
    await renderCards(res);
});

app.post('/cards', async function(req, res) {
    const card = {
        name: req.body.name,
        text: req.body.text
    };
    await db.addCard(card);

    await renderCards(res);
});

let port = process.env.PORT;
if (port === undefined) {
    port = 5000;
}
app.listen(port, () => console.log(`${port} is the magic port`));