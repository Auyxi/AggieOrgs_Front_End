import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './OrgDisplay.module.css'

const OrgDisplay = ({orgName, tags, date}) => ( 
	<div className = {styles.OrgBody}>
		<div className = {styles.orgName}>{orgName}</div>
		<div className = {styles.bottomLine}>
			<div className = {styles.tags}><b>Tags: </b>{tags}</div>
			<div className = {styles.dateAdded}>Added {date}</div>
		</div>
	</div>
	);

export default OrgDisplay