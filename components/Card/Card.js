
//https://medium.com/better-programming/build-a-reusable-responsive-card-component-with-styled-components-3ca14933f7e5

import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './Card.module.css'

const Card = (props) => ( 
	<div classname = {styles.CardBody}>
		<OrgName>Org Name Here</OrgName>
		<p2>Purpose</p2>
		<Purpose>The purpose and objectives of this organization shall be to allow members to choreograph dances (ballet, tap, jazz, hip hop, modern, and contemporary) for members of the Bryan/College Station Community, who want to perform...</Purpose>
		<p2>Tags</p2>
		<Tags>Tags go here</Tags>
		<QuickLook>Quick Look ></QuickLook>
		<Button>Interested!</Button>
		<Button>No, thanks!</Button>
	</div>
	)
export default Card