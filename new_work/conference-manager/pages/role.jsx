import Background from '../components/Background';
import Button from '../components/Button';

function role() {
  return (
    <div>
      <Background type='plain' color='#EEEEEE'>
        <div className='role-container fade'>
          <h1 className='role-title'>Conference Manager</h1>
          <h3 className='choose'>choose a role</h3>
          <div className='choice-container'>
            <Button className='choice' color='#4C82F8' title='Planner' onclick={() => {
              const home = window.location.href.slice(0,-4);
              window.location.replace(home + '/planner/dashboard');
            }}/>
            <p className='or'> — or — </p>
            <Button className='choice' color='#4C82F8' title='Attendee' onclick={() => {
              const home = window.location.href.slice(0,-4);
              window.location.replace(home + '/attendee/booking');
            }}/>
          </div>
        </div>
      </Background>
    </div>
  )  
}

export default role;
