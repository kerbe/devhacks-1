const express = require('express');
const { Database } = require('detalib');
const { nanoid } = require('nanoid');
const app = express();

app.set('view engine', 'pug');
app.set('views', '.');
app.use(express.urlencoded())

const db = new Database('userRecords');
const secretz = new Database('secretz');

app.get('/', (req, res) => {
    res.render('views_index')
});

app.get('/add', (req, res) => {
    res.render('views_add')
});

app.post('/add', async (req, res) => {
    const dbKey = nanoid();
    const uniqID = nanoid(10);
    const dbObject = {
        uniqID: uniqID,
        added: req.body.added,
        name: req.body.name,
        skills: req.body.skills,
        timezone: req.body.timezone,
        languages: req.body.languages,
        info: req.body.info,
        contact: req.body.contact
    }

    await db.put(dbKey, dbObject);
    await secretz.put(uniqID, dbKey);
    const entries = await db.all();
    res.render('views_browse', { entries: entries, uniqID: uniqID });
});

app.get('/delete', (req, res) => {
    res.render('views_delete')
});

app.post('/delete', async (req, res) => {
    const dbEntry = await secretz.get(req.body.uniqID);
    await db.delete(dbEntry.data);
    res.render('views_delete', { uniqID: req.body.uniqID });
});

app.get('/browse', async (req, res) => {
    const entries = await db.all();
    res.render('views_browse', { entries: entries });
});

app.get('/browse/:entryKey', async (req, res) => {
    const entry = await db.get(req.params.entryKey);
    res.render('views_browsesingle', { entry: entry });
});

app.get('/about', (req, res) => {
    res.render('views_about');
});

app.get('/dbtest', async (req, res) => {
    try {
        const db_content = await db.all();
        const secret_content = await secretz.all();
        const result = "DB content: " + JSON.stringify(db_content) + "<br />" + JSON.stringify(secret_content);
        res.send(result);    
    } catch (err) {
        console.log('Error in DB: ', err);
    }
});

app.get('/dbwipe', async (req, res) => {
    const dbContent = await db.all();
    dbContent.forEach(obj => {
        db.delete(obj.key);
    });
    const secretzContent = await secretz.all();
    secretzContent.forEach(obj => {
        secretz.delete(obj.key);
    });
    res.send('done?');
})

module.exports = app;