const MongoClient = require('mongodb').MongoClient;
const {uri, db} = require('./config');
const ObjectId = require('mongodb').ObjectID;

const addNote = async newNote => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const noteCollection = await client.db(db).collection("notes");
        await noteCollection.insertOne(newNote);

        client.close();
    } catch (e) {
        throw e;
    };
};

const addList = async list => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const listCollection = client.db(db).сollection('lists');
        await listCollection.insertOne(list);

        console.log("1 document inserted");
        client.close();

    } catch (e) {
        throw e;
    };
};

const getNote = async id => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const noteCollection = await client.db(db).collection("notes");
        result = await noteCollection.findOne({"_id":ObjectId(id)});
        client.close();

        return result;
    } catch (e) {
        throw e;
    };
};

const getList = async (id) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const listCollection = await client.db(db).сollection("lists");
        result = await listCollection.findOne({"_id": ObjectId(id)});
        client.close();
        return result;

    } catch (e) {
        throw e;
    };
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
    };
};

const getLists = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const listCollection = client.db(db).сollection('lists');
        result = await listCollection.find({}).toArray();

        client.close();
        return result;
    } catch (e) {
        throw e;
    }
};

const editNote = async (id,theme,text) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const newvalues = { $set: {"themeNote": theme, "textNote": text } };

        const noteCollection = await client.db(db).collection("notes");
        await noteCollection.updateOne({"_id":ObjectId(id)},newvalues);
        client.close();

    } catch (e) {
        throw e;
    };
};

const editList = async (id, list) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const listCollection = await client.db(db).сollection("notes");
        await listCollection.updateOne({"_id": ObjectId(id)}, {$set: list});
        client.close();

    } catch (e) {
        throw e;
    };
};

const delNote = async id => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const noteCollection = await client.db(db).collection("notes");
        // await noteCollection.deleteOne({"_id":ObjectId(id)});  //нужно розкомитить когда будет переход из карточки
        client.close();
    } catch (e) {
        throw e;
    };
};

const delList = async (id) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const listCollection = await client.db(db).listCollection("lists");
        await listCollection.deleteOne({"_id": ObjectId(id)});
        client.close();

    } catch (e) {
        throw e;
    };
};

module.exports = {
    addNote,
    addList,
    getNote,
    getList,
    getNotes,
    getLists,
    editNote,
    editList,
    delNote,
    delList
};
