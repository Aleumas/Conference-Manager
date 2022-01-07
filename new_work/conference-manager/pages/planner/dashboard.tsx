import Background from '../../components/Background';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Calendar from '../../components/Calendar'
import { signout, getConferences } from '../../scripts/firebase';
import React, { useState, useEffect, useMemo } from 'react';


// TODO: Add user summary. i.e. ID and stats (number of conferences, )
// TODO: Add number of attendee's column
// TODO: Fix the 0 conferences table issue


function planner() {

  return (
    <Background type='plain' color='#EEEEEE'>
      <div className='fade content'>
        <div className='header'>
          <div>
            <h1 className='title'> Conference Manager </h1>
            <h3 className='sub-title'> dashboard </h3>
          </div>
          <div className='buttons-container'>
            <Button className='signout' title='+ conference' color='#4c82f8' onclick={() => {
              window.location.replace(window.location.href.slice(0,window.location.href.lastIndexOf('/')) + "/add_conference");
            }}/>
            <Button className='signout' title='sign out' color='#f8554c' onclick={() => {
              signout();
            }}/>
          </div>
        </div>
        <div className='scroll'>
          <Table/> 
        </div>
      </div>

    </Background>    
  );
}

export default planner;
