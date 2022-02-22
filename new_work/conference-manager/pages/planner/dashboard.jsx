import Background from '../../components/Background';
import Button from '../../components/Button';
import Table from '../../components/Table';
import User from '../../components/User';
import { signout } from '../../scripts/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: Add number of attendee's column

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
        <div className='scroll planner-content'>
          <Table/> 
          <User/>
        </div>
      </div>

    </Background>    
  );
}

export default planner;
