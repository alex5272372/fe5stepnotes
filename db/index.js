const MongoClient = require('mongodb').MongoClient;
const {uri, db} = require('./config');

const addCard = async card => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('cards');
        await collection.insertOne(card);

        console.log("1 document inserted");
        client.close();
    } catch (e) {
        throw e;
    }
};

const getCards = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('cards');
        result = await collection.find({}).toArray();

        client.close();
        return result;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    addCard,
    getCards
};
