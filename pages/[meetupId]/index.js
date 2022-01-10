import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
const MeetupDetails = (props) => {
  return (
    <>
      {/* {console.log(props.meetupData)} */}
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};
export const getStaticPaths = async () => {
  //   const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://Admin:Oor1b9JMFxpe0382@cluster0.gutio.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  //   console.log(meetupId);
  const client = await MongoClient.connect(
    'mongodb+srv://Admin:Oor1b9JMFxpe0382@cluster0.gutio.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
      },
    },
  };
};

export default MeetupDetails;
