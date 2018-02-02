import React from 'react';

// import './about.css';

import styles from './styles.css';

const aboutWrapper ={
    marginLeft:'7px',
    marginRight:'7px',
    width:'258px',
    height:'475px',
    borderRadius:'4px',
    background:'black',
    color:'white'
}

const About = () => 
    <div style={styles.aboutWrapper}>
        <h1>About</h1>
        <p>In 1980, the Museum of Contemporary Photography established a permanent collection and it is through this collection that the museum has been able to provide an invaluable research and educational resource to the general public and thousands of students. In 2009, the growing collection was digitized and made available online for free to the general public. </p>
		<p>MoCP.me is a web application using computer vision and machine learning as a way to interact with the MoCP collection on user-generated terms.</p>
    </div>

export default About;