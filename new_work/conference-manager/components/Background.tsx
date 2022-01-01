
function Background(props) {

	const imageStyling = {
		"background-color" : props.color, 
		"background-blend-mode" : "multiply", 
		"background-size" : "contain",
		"background-image": `url(${props.image})`
	}

	if (props.type == 'plain') {

		if (props.color!= undefined) {
			return <div className='fill' style={{"background-color" : props.color}}></div>;
		}

	} else if (props.type == 'image') {

		if (props.image != undefined && props.color != undefined) {

			return <div className='fill' style={imageStyling}></div>;

		}

	}

	return <h1>Invalid arguments</h1>;
}

export default Background;
