import React from 'react';


function ContactForm(props) {
	const formValues = {
		name: '',
		email: '',
		message: ''
	};

	return (
		<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundImage: "url('images/img_highest.jpg')", minHeight: "100vh", minWidth: "300px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
			<h1 className="orbi">Contact</h1>

			<form name="contact" className="contactForm" onSubmit={props.HandleSubmitAndToggle(formValues)} data-netlify="true">
				<input onChange={ e => formValues.name = e.target.value } className="orbi" style={{fontSize: "22pt",  color: "white", backgroundColor: "rgba(0,0,0,0.6)"}} name="name" type="text" placeholder="Your name" />
				<input onChange={ e => formValues.email = e.target.value } className="orbi" style={{fontSize: "22pt",  color: "white", backgroundColor: "rgba(0,0,0,0.6)"}} name="email" type="email" placeholder="Your email" />
				<textarea onChange={ e => formValues.message = e.target.value } className="orbi" style={{ color: "white", backgroundColor: "rgba(0,0,0,0.6)"}} name="message" id="" cols="30" rows="10" placeholder="Your request"></textarea>
				<input className="orbi" style={{fontSize: "22pt",  color: "white", backgroundColor: "rgba(0,0,0,0.5)"}} type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default ContactForm;
