function Conference_card(props) {
	const location_icon = require('../public/Location.svg').default.src;
	const date_icon = require('../public/Date.svg').default.src;
	const time_icon = require('../public/Time.svg').default.src;

	return (
		<div className={'card-container'}>
			<div className={'card-content'}>

				<h1>{props.title}</h1>
				<p className='card-summary'>{props.summary}</p>

				<div className='card-details-container'>

					<div className='card-details'>

						<div className='details-container'>
							<img className='icon' src={location_icon}/>
							<h4 className='details'>{'Location: ' + props.location}</h4>
						</div>

						<div className='details-container'>
							<img className='icon' src={date_icon}/>
							<h4 className='details'>{'Date: ' + props.date}</h4>
						</div>

						<div className='details-container'>
							<img className='icon' src={time_icon}/>
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
