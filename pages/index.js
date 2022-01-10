import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetup by Ashish</title>
        <meta
          name='description'
          content='Huge List of highly active react meetups'
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   // const req = context.req;
//   // const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// };

export const getStaticProps = async () => {
  //fetch apis
  // fetch('/api/meetups');
  const client = await MongoClient.connect(
    'mongodb+srv://Admin:Oor1b9JMFxpe0382@cluster0.gutio.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  // console.log('connection successfull');

  const db = client.db();
  // console.log('database accessed');

  const meetupCollection = db.collection('meetups');
  // console.log('meetup added to collection for inserting');

  const meetups = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.data.title,
          address: meetup.data.address,
          image: meetup.data.image,
          description: meetup.data.description,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
};

export default HomePage;
