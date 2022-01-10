import React from 'react';
import classes from './MeetupDetail.module.css';
const MeetupDetail = (props) => {
  return (
    <>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>

        {/* <img src='https://www.wraltechwire.com/wp-content/uploads/2019/09/networking-meetup-stock-photo-1280x640.jpg' />
      <h1>A first Meetup</h1>
      <address>some Adddress</address>
      <p>meetup descreption</p> */}
      </section>
    </>
  );
};

export default MeetupDetail;
