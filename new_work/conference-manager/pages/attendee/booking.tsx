import React, { useState, useEffect, Fragment } from 'react';
import Conference_card from '../../components/Conference_card';
import Background from '../../components/Background';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
      </div>
        <div className='all-conferences'>
          {conferenceCardData.map((cardInfo) => {
            console.log(cardInfo);
            return <Conference_card title={cardInfo.name} location={cardInfo.location} date={cardInfo.date} time={cardInfo.time}/>
          })}
        </div>
    </Background>
  );
}

export default booking;
