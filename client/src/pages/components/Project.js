import React, { useState } from 'react';
import useResize from './hooks/useResize';
import { motion } from 'framer-motion';


function Project(props) {
	const project = props.data;

	const [width] = useResize();
	const [isDisplayed, setDisplay] = useState({display: 'none'});
	const [buttonPos, setPos] = useState({y: 0});
	
	const handleOpenLayoutAndFillSynop = (title, description, project_type, website=null) => {
		setDisplay({display: 'flex'});
		
		setPos({y: 125});

		props.fillSynopsis(title, description, project_type, website)
	};

	const handleMouseLeave = () => {
		setDisplay({display: 'none'});

		setPos({y: 0});
	};
	
	return (
		<div style={{height: '280px'}}
			onMouseLeave={handleMouseLeave}
		>	
			<div className="dropCard">
				{width < 600 ?	
					<div 
						style={{position: "relative"}} 
						onClick={handleOpenLayoutAndFillSynop.bind(this, project.title, project.description, project.project_type, project.website)}
					>
						<div style={{backgroundImage: "url("+ project.icon +")"}} className="card"></div>
						
						<div className="article lay"
							style={isDisplayed}
							onClick={props.callbackForModal.bind(this, {
								url: project.website,
								title: project.title, 
								logic: project.app, 
								gitData: props.gitData
							})
						}>
							<h2 className="clickOpen orbi">OPEN</h2>
						</div>
					</div>
				 :
				 	<div 
						style={{position: "relative"}} 
						onMouseEnter={handleOpenLayoutAndFillSynop.bind(this, project.title, project.description, project.project_type, project.website)}
					>
						<div style={{backgroundImage: "url("+ project.icon +")"}} className="card"></div>
						
						<div className="article lay"
							style={isDisplayed}
							onClick={props.callbackForModal.bind(this, {
								url: project.website,
								title: project.title, 
								logic: project.app, 
								gitData: props.gitData,
							})
						}>
							<h2 className="clickOpen orbi">OPEN</h2>
						</div>
					</div>
				}

				<motion.a 
					rel="noopener noreferrer" className="gitBTN" target="_blank"
					href={ project.git_url }
					animate={buttonPos}
					transition={{ ease: "easeOut", duration: 1 }}
				>
					<i className="fab fa-4x fa-github"></i>
				</motion.a>
			</div>
		</div>
	)
}

export default Project;