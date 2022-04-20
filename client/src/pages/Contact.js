import React, { useState } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar.js';
import ContactForm from './components/ContactForm.js';
import ThankyouOnSubmit from './components/ThankyouOnSubmit.js';


function Contact() {
	const [isSubmitted, setBool] = useState(false);

	const HandleSubmitAndToggle = contactFieldValues => e => {
		e.preventDefault();
		
		for(let key in contactFieldValues) {
			if (!contactFieldValues[key]) {
				alert('Please fill out all fields');

				return false;
			}
		}
		
		axios.post(process.env.REACT_APP_CONTACT_API_URL, contactFieldValues, {
			headers: {
			  // Overwrite Axios's automatically set Content-Type
			  'Content-Type': 'application/json'
			}, 
			crossDomain: true 
		})
		.then(res => res)
		.catch(err => console.log(err));

		setBool(!isSubmitted);
	};

	if (isSubmitted) {
		return (
			<div className="orbi">
				<Navbar class={'barcode contactNav'} />

				<ThankyouOnSubmit />
			</div>
		)
	} else {
		return (
			<div className="orbi">	
				<Navbar class={'barcode contactNav'} />

				<ContactForm HandleSubmitAndToggle={HandleSubmitAndToggle} />
			</div>
		)
	}
}

export default Contact;
