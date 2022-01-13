import location_icon from '../public/Location.svg';
function Conference_card(props) {
	const date_icon = require('../public/Date.svg');
	const time_icon = require('../public/Time.svg');


	return (
		<div className={'card-container'}>
			<div className={'card-content'}>

				<h1>{props.title}</h1>
				<p className='card-summary'>{props.summary}</p>

				<div className='card-details-container'>

					<div className='card-details'>

						<div className='details-container'>
							<img src={location_icon}/>
							<h4 className='details'>{'Location: ' + props.location}</h4>
						</div>

						<div className='details-container'>
							<img src={date_icon}/>
							<h4 className='details'>{'Date: ' + props.date}</h4>
						</div>

						<div className='details-container'>
							<img src={time_icon}/>
							<h4 className='details'>{'Time: ' + props.time}</h4>
						</div>
					</div>

					<button className='book-conference'>Book</button>

				</div>
				
			</div>
		</div>
	);
}

export default Conference_card;
