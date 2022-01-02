
function Background(props) {

	const imageStyling = {
		"backgroundColor" : props.color, 
		"backgroundBlendMode" : "multiply", 
		"backgroundSize" : "contain",
		"backgroundImage": `url(${props.image})`
	}

	if (props.type == 'plain') {

		if (props.color!= undefined) {
			return <div className='fill' style={{"background-color" : props.color}}>{props.children}</div>;
		}

	} else if (props.type == 'image') {

		if (props.image != undefined && props.color != undefined) {
			return <div className='fill' style={imageStyling}>{props.children}</div>;
		}

	}

	return <h1>Invalid arguments!</h1>;
}

export default Background;
