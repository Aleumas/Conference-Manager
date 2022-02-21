function Button(props) {
	return <button type={props.type} className={props.className} onClick={props.onclick} style={{"backgroundColor": props.color}}>{props.title}</button>
}

export default Button;
