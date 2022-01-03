function Button(props) {
	return <button className={props.className} onClick={props.onclick} style={{"backgroundColor": props.color}}>{props.title}</button>
}

export default Button;
