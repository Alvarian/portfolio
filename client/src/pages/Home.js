import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar.js';

import { motion } from 'framer-motion';
import { BeatLoader } from 'react-spinners';
import CountUp from 'react-countup';


function scrollUp(){
	window.location.replace("/#top");

  //   let scrollStep = -window.scrollY / (1000 / 15),
		// scrollInterval = setInterval(function(){
	 //        if ( window.scrollY !== 0 ) {
	 //            window.scrollBy( 0, scrollStep );
	 //        }
	 //        else clearInterval(scrollInterval); 
		// }, 15);
}

function scrollDown() {
	window.location.replace("/#middleBio");
	// console.log(document.body.offsetHeight)
	// let { y } = document.getElementById("middleBio").getBoundingClientRect(),
	// 	scrollInterval = setInterval(function(){
	//         if ( window.scrollY !== y ) {
	//             window.scrollBy( 0, document.body.offsetHeight / (1000 / 15) );
	//         }
	//         else clearInterval(scrollInterval); 
	// 	}, 15);	
}

function Home() {
	const [numOfProjs, setNumOfProjs] = useState(0);
	const [numOfSolved, setNumOfSolved] = useState(0);

	useEffect(() => {
		fetch("https://www.codewars.com/api/v1/users/Alvarian_")
			.then(response => response.json())
			.then(json => setNumOfSolved(json.codeChallenges.totalCompleted))
			.then(() => {
				fetch(process.env.REACT_APP_CONTENT_API_URL)
					.then(response => response.json())
					.then(json => setNumOfProjs(json.length))
					.catch(err => console.log(err))
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div>
			<Navbar id="top" class={'amatic homeNav'} />

			<div className="amatic" id="scrolltop">
				<div className="school" style={{display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center"}}>
					<motion.div 
						variants={{
						  visible: {
						    opacity: 1,
						    transition: {
						      duration: 1
						    },
						  },
						  hidden: {
						    opacity: 0
						  },
						}}
						initial="hidden"
						animate="visible"
						className="titleSection"
					>
						<span className="welcome">IVAN ALVAREZ</span>

						<div className="pitch">Self-learned software technologies through full stack development.</div>

						<ul className="bench">	
							<li>
								{ !numOfProjs ?
									<BeatLoader loading />
								 :
									<CountUp duration={4} end={numOfProjs} className="counter proj-num" /> 
								}
								<a rel="noopener noreferrer" className="bio-links" href="/gallery">fullfilled Applcations</a>
							</li>

							<li>
								{ !numOfProjs ?
									<BeatLoader loading />
								 :
									<CountUp duration={4} end={numOfSolved} className="counter cw-num" /> 
								}
								<a rel="noopener noreferrer" className="bio-links" href="https://www.codewars.com/users/Alvarian_" target="_blank">solved problems</a>
							</li>
						</ul>
					</motion.div>

					<motion.div 
						variants={{
						  visible: {
						    opacity: 1,
						    transition: {
						      delay: 2,
						      duration: 2
						    },
						  },
						  hidden: {
						    opacity: 0
						  },
						}}
						initial="hidden"
						animate="visible" className="anchor aboutBtn" onClick={scrollDown}>
						<span style={{fontSize: "20pt"}}>About me</span>

						<i style={{fontSize: "30pt"}} className="fas fa-arrow-down"></i>
					</motion.div>
				</div>

				<div id="middleBio" style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
					<div style={{width: "100%", zIndex: 5}}>
						<div className="float" style={{backgroundColor: "wheat", display: "flex", justifyContent: "spaceAround", width: "100%"}}>
							<div className="des">
								<div style={{display: "flex", width: "210px", height: "250px", flexDirection: "column", justifyContent: "space-around", alignItems: "center", backgroundColor: "white"}}>
									<div className="icon"></div>

									<div className="amatic" style={{fontWeight: "bold", letterSpacing: "2px", transform: "rotate(5deg)"}}>IVAN A. 2018</div>
								</div>
								
								<div className="bio arial">
									<span style={{fontSize: "50pt", float: "left", marginRight: "20px"}}>Hi</span>
									As a NYC-based website developer, I am always looking for more experience and knowledge.
									
									<p>I have a versitile skillset ranging from front end to back end technologies, with a great sense of idiomatic usage of frameworks and platforms.</p>
								
									<p>Feel free to browse my work!</p>

									<p>presented in my <a style={{fontSize: "10pt"}} className="pressStart" href="/gallery">Gallery</a></p>
									
									<p>or <a rel="noopener noreferrer" className="orbi" href="https://github.com/Alvarian" target="_blank">Github</a></p>
								</div>
							</div>
						</div>
					</div>

					<div className="purp" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
						<h1 style={{textAlign: "center", margin: "0", fontSize: "34pt", color: "wheat"}}>Incorporated...</h1>
					</div>

					<div className="float" style={{display: "flex", justifyContent: "space-around", padding: "70px 0px", width: "100%"}}>
						<div className="bord">
							<h2>Commonly Used</h2>

							<div className="loopUsed">
								<i className="badges devicon-nodejs-plain colored"></i>
								<i className="badges devicon-docker-plain colored"></i>
								<i className="badges devicon-python-plain colored"></i>
								<i className="badges devicon-amazonwebservices-plain-wordmark colored"></i>
								<i className="badges devicon-postgresql-plain colored"></i>
								<i className="badges devicon-react-original colored"></i>
							</div>
						</div>

						<div className="bord">
							<h2>Tried and Understood</h2>

							<div className="loopUnderstood">
								<i className="badges devicon-redis-plain colored"></i>
								<i className="badges devicon-mongodb-plain-wordmark colored"></i>
								<i className="badges devicon-mysql-plain-wordmark colored"></i>
								<i className="badges devicon-php-plain colored"></i>
							</div>
						</div>
					
						<div className="bord">
							<h2>Learning...</h2>

							<div className="loopLoading">
								<i className="badges devicon-rust-plain colored"></i>
								<i className="badges devicon-nginx-plain colored"></i>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div style={{position: "relative"}}>
				<div style={{position: "absolute"}} className="theLib"></div>
				<div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
					<div className="footerBtns">
						<a rel="noopener noreferrer" href="https://github.com/Alvarian/" className="circle anchor" target="_blank"><i className="fab fa-github"></i></a>
						<a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className="circle anchor" target="_blank"><i className="fab fa-linkedin-in"></i></a>
						<div className="circle anchor scrollUp" onClick={scrollUp}><i className="fas fa-arrow-up"></i></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
