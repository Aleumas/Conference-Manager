function Button(props) {
	return <button onClick={props.onclick} style={{"backgroundColor": props.color}}>{props.title}</button>
}

export default Button;
