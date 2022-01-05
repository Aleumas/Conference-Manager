import Background from '../../components/Background.tsx';
import Button from '../../components/Button.tsx';
import Table from '../../components/Table';
import { signout, getConferences } from '../../scripts/firebase.tsx';
import React, { useState, useEffect, useMemo } from 'react';

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
