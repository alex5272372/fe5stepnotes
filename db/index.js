const MongoClient = require('mongodb').MongoClient;
const {uri, db} = require('./config');

const addNote = async note => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('notes');
        await collection.insertOne(note);

        console.log("1 document inserted");
        client.close();
    } catch (e) {
        throw e;
    }
};

const getNotes = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('notes');
        result = await collection.find({}).toArray();

        client.close();
        return result;
    } catch (e) {
        throw e;
    }
};

const addList = async list => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('lists');
        await collection.insertOne(list);

        console.log("1 document inserted");
        client.close();
    } catch (e) {
        throw e;
    }
};

const getLists = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('lists');
        result = await collection.find({}).toArray();

        client.close();
        return result;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    addNote,
    getNotes,
    addList,
    getLists
};
