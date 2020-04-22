import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './OrgDisplay.module.css'

class OrgDisplay extends React.Component {
	constructor(props) {
        super(props);
    }

	render() {
		return(
			<div className = {styles.OrgBody}>
				<div className = {styles.orgName}>{this.props.orgName}</div>
				<div className = {styles.bottomLine}>
					<div className = {styles.tags}><b>Tags: </b>{this.props.tags}</div>
<<<<<<< HEAD
=======
					<div className = {styles.dateAdded}>Date Added: {this.props.purpose}</div>
>>>>>>> 2a61b436f95d77e1362afe50ce612bd099491373
				</div>
			</div>
		)
	}
}

export default OrgDisplay