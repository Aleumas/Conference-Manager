import Background from '../../components/Background.tsx';
import Button from '../../components/Button.tsx';
import Input from '../../components/Input.tsx';
import{ createConference } from '../../scripts/firebase.tsx';

function add_conference() {
  return (
    <Background color='#EEEEEE' type='plain'> 
      <div className='fade content'>
        <div className='header'>
          <div>
            <h1 className='title'> Conference Manager </h1>
            <h3 className='sub-title'> new conference </h3>
          </div>
          <Button className='signout' title='back' color='#f86d4c' onclick={() => {
            const lastIndex = window.location.href.lastIndexOf('/');
            const home = window.location.href.slice(0, lastIndex).slice(0, lastIndex);
            window.location.replace(home + '/dashboard');
          }}/>
       
        </div>
        <div className='conference-survey'>
            <Input className='conference' type='normal' id='name' placeholder='name'/>
            <Input className='conference' type='normal' id='location' placeholder='location'/>
            <Input className='conference' type='normal' id='time' placeholder='time'/>
            <Input className='conference date' type='date' id='date' placeholder='date'/>
            <select  id='access' placeholder="access">
              <option value=''> access </option>
              <option value='Public'> public </option>
              <option value='Private'> private </option>
            </select>
            <Button className='signout conference' title='Add Conference' color='#4c82f8' onclick={() => {
              createConference();
            }}/>
        </div>
      </div>
    </Background>
  );
}

export default add_conference;
