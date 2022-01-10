import { MongoClient } from 'mongodb';
// import MeetupDetails from '../[meetupId]';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    // const { title, image, address, descreption } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://Admin:Oor1b9JMFxpe0382@cluster0.gutio.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    // console.log('connection successfull');

    const db = client.db();
    // console.log('database accessed');

    const meetupCollection = db.collection('meetups');
    // console.log('meetup added to collection for inserting');

    const result = await meetupCollection.insertOne({ data });
    // console.log('result return ');
    console.log(result);

    client.close();
    // console.log('connection closed');

    res.status(201).json({ message: 'meetup inserted' });
  }
}
export default handler;
