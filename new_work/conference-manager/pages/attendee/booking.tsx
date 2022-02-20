import React, { useState, useEffect, Fragment } from 'react';
import Conference_card from '../../components/Conference_card';
import Background from '../../components/Background';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { signout } from '../../scripts/firebase';
import Button from '../../components/Button';

function booking() {

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;
  const [conferenceCardData, updateCardData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let allCardData = [];
      if (user) {
        const querySnapshot = getDocs(collection(firestore, 'conferences'));
          querySnapshot.then((result) => {
              result.forEach((doc) => {

                allCardData = allCardData.concat(doc.data().conferences);
              })
              updateCardData(allCardData);
        })
      }  
    });
  }, []);
  
  console.log(conferenceCardData);

  return (
    <Background type='plain' color='#EEEEEE'>
      <div className='header'>
        <div>
          <h1 className='title'> Conference Manager </h1>
          <h3 className='sub-title'> Booking </h3>
        </div>
        <div className='buttons-container'>
            <Button className='signout' title='back' color='#f86d4c' onclick={() => {
              const lastIndex = window.location.href.lastIndexOf('/');
              const home = window.location.href.slice(0, lastIndex);
              lastIndex = home.lastIndexOf('/');
              home = home.slice(0, lastIndex);
              window.location.replace(home + '/role');
            }}/>
            <Button className='signout' title='sign out' color='#f8554c' onclick={() => {
              signout();
            }}/>
          </div>
      </div>
        <div className='all-conferences'>
          {conferenceCardData.map((cardInfo) => {
            console.log(cardInfo);
            return <Conference_card ownerId={cardInfo.ownerId} conferenceIndex={cardInfo.conferenceIndex} attendees={cardInfo.attendees} summary={cardInfo.summary} title={cardInfo.name} location={cardInfo.location} date={cardInfo.date} time={cardInfo.time}/>
          })}
        </div>
    </Background>
  );
}

export default booking;
