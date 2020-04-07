
//https://medium.com/better-programming/build-a-reusable-responsive-card-component-with-styled-components-3ca14933f7e5

import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './Card.module.css'

const StyledYesButton = withStyles({
	root: {
		background: '#70cd61',
		color: 'black',
		padding: '5px 20px 5px 20px',
		border: "2px solid #70cd61",
		'font-family': 'Roboto',
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
		'&:hover': {
			background: 'white',
			color: 'black',
			"font-weight": "bold",
		}

	},
})(Button);

const Card = ({orgName, purpose, tags}) => ( 
	<div classname = {styles.CardBody}>
		<div classname = {styles.OrgName}>{orgName}</div>
		<div classname = {styles.title}>Purpose</div>
		<div classname = {styles.purpose}>{purpose}</div>
		<div classname = {styles.title}>Tags</div>
		<div classname = {styles.Tags}>Tags go here</div>
		<div classname = {styles.QuickLook}>Quick Look ></div>
		<StyledYesButton>Interested!</StyledYesButton>
		<StyledNoButton>No, thanks!</StyledNoButton>
	</div>
	)
export default Card