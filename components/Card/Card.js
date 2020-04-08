
//https://medium.com/better-programming/build-a-reusable-responsive-card-component-with-styled-components-3ca14933f7e5

import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './Card.module.css'
import { withStyles } from '@material-ui/core/styles'

const StyledYesButton = withStyles({
	root: {
		background: '#70cd61',
		color: 'black',
		padding: '5px 20px 5px 20px',
		border: "2px solid #70cd61",
		width: '250px',
		height: '50px',
		'font-family': 'Roboto',
		position: 'absolute',
		'font-weight': 'bold',
		bottom: 0,
		left: 0,
		'&:hover': {
			background: 'white',
			color: 'black',
			"font-weight": "bold",
		}

	},
})(Button);

const StyledNoButton = withStyles({
	root: {
		background: '#cd6161',
		color: 'black',
		padding: '5px 20px 5px 20px',
		border: "2px solid #cd6161",
		'font-family': 'Roboto',
		width: '250px',
		height: '50px',
		'font-weight': 'bold',
		position: 'absolute',
		bottom: 0,
		right: 0,
		'&:hover': {
			background: 'white',
			color: 'black',
			"font-weight": "bold",
		}

	},
})(Button);

const Card = ({orgName, purpose, tags}) => ( 
	<div className = {styles.CardBody}>
		<div className = {styles.OrgName}>{orgName}</div>
		<div className = {styles.title}>Purpose</div>
		<div className = {styles.purpose}>{purpose}</div>
		<div className = {styles.title}>Tags</div>
		<div className = {styles.Tags}>{tags}</div>
		<div className = {styles.QuickLook}>Quick Look ></div>
		<StyledYesButton>Interested!</StyledYesButton>
		<StyledNoButton>No, thanks!</StyledNoButton>
	</div>
	);

export default Card