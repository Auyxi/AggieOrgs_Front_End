
//https://medium.com/better-programming/build-a-reusable-responsive-card-component-with-styled-components-3ca14933f7e5

import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './Card.module.css'
import { withStyles } from '@material-ui/core/styles'

const StyledYesButton = withStyles({
	root: {
		background: '#800000',
		color: 'white',
		padding: '5px 20px 5px 20px',
		border: "2px solid #800000",
		width: '150px',
		height: '50px',
		margin: '20px',
		'font-family': 'Roboto',
		'font-weight': 'bold',
		bottom: 0,
		float: 'left',
		'&:hover': {
			background: 'white',
			color: 'black',
			"font-weight": "bold",
		}

	},
})(Button);

const StyledNoButton = withStyles({
	root: {
		background: '#e5e5e5',
		color: 'black',
		padding: '5px 20px 5px 20px',
		border: "2px solid #e5e5e5",
		'font-family': 'Roboto',
		width: '150px',
		height: '50px',
		'font-weight': 'bold',
		bottom: 0,
		margin: '20px',
		float: 'left',
		'&:hover': {
			background: 'white',
			color: 'black',
			"font-weight": "bold",
		}

	},
})(Button);

const Card = ({orgName, purpose, dues, conName, conEmail, time}) => ( 
	<div className = {styles.CardBody}>
		<div className = {styles.OrgName}>{orgName}</div>
		<div className = {styles.title}>Purpose</div>
		<div className = {styles.purpose}>{purpose}</div>
		<div className = {styles.title}>Membership Dues</div>
		<div className = {styles.dues}>{dues}</div>
		<div className = {styles.title}>Public Contact Information</div>
		<div className = {styles.contact}>{conName} | {conEmail}</div>
		<div className = {styles.title}>Weekly Time Committment</div>
		<div className = {styles.time}>{time}</div>
		<StyledYesButton>Interested!</StyledYesButton>
		<StyledNoButton>No, thanks!</StyledNoButton>
	</div>
	);

export default Card