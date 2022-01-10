function Conference_card(props) {
	return (
		<div className={'card-container'}>
			<div className={'card-content'}>

				<h1>{props.title}</h1>
				<p className='card-summary'>{props.summary}</p>

				<div className='card-details-container'>

					<div className='card-details'>

						<div classname='details-container'>
							<img />
							<h4 className='details'>{'Location: ' + props.location}</h4>
						</div>

						<div classname='details-container'>
							<img />
							<h4 className='details'>{'Date: ' + props.date}</h4>
						</div>

						<div classname='details-container'>
							<img />
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
