import React, { useEffect } from 'react';
import Conference_card from '../../components/Conference_card.tsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function booking() {

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const querySnapshot = getDocs(collection(firestore, 'conferences'));
          querySnapshot.then((result) => {
              result.forEach((doc) => {
                console.log(doc.data().conferences)
            })
        })
      }  
    });
  },[])
  



  return (
    <div>
      <div className='header'>
        <div>
          <h1 className='title'> Conference Manager </h1>
          <h3 className='sub-title'> Booking </h3>
        </div>
      </div>

      <Conference_card/>
    </div>
  );
}

export default booking;
