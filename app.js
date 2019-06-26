const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

async function renderMainPage(res) {
    const notes = await db.getNotes();
    const lists = await db.getLists();

    res.render('pages/index', {
        notes,
        lists
    });
}

app.get('/', async function(req, res) {
    renderMainPage(res);
});

//this card view
app.get('/notes/:id', async function(req,res) {
    const viewNote = await db.getNote(req.params.id);
    // await res.render('pages/noteEdit',{viewNote});
    res.json(viewNote);
});

app.get('/lists/:id', async function(req,res) {
    res.json(await db.getList(req.params.id));
});

app.post('/notes', async function(req, res) {
    if(req.body.noteTheme){
        await db.addNote({
            themeNote: req.body.noteTheme,
            textNote: req.body.noteTextarea
        });
    }
    res.redirect('/');
});

app.post('/lists', async function(req, res) {
    await db.addList(req.body);
    renderMainPage(res);
});

//edit note
app.put('/api/notes/:id', function(req, res) {
    db.editNote(req.params.id,req.body.noteTheme,req.body.noteTextarea)
    .then(() => {
        res.send('Success')
    })
    .catch(err => {
        res.status.json({ err: err });
    });
});

app.put('/api/lists/:id', function(req, res) {
    db.editList(req.params.id, req.body)
        .then(() => {
            res.send('Success')
        })
        .catch(err => {
            res.status.json({ err: err });
        });
});

//delete note
app.delete('/api/notes/:id', function(req, res) {
    db.delNote(req.params.id)
        .then(() => {
            res.send('Success')
        })
        .catch(err => {
            res.status.json({ err: err });
        });
});

app.delete('/api/lists/:id', function(req, res) {
    db.delList(req.params.id)
        .then(() => {
            res.send('Success')
        })
        .catch(err => {
            res.status.json({ err: err });
        });
});

app.post('/note', async function(req, res) {
    console.log("in post note")
    if(req.body.noteTheme){
        await db.addNote({
            themeNotes: req.body.noteTheme,
            textNotes: req.body.noteTextarea
        });
    }
    res.redirect('/');
});

let port = process.env.PORT;
if (port === undefined) {
    port = 5000;
}
app.listen(port, () => console.log(`${port} is the magic port`));