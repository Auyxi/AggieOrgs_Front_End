import SideNavLayout from "../components/SideNavLayout";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { MenuItem } from "@material-ui/core";
//import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';

// using material-ui now https://material-ui.com/components/selects/
// dynamic forms for later https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// react forms doc https://reactjs.org/docs/forms.html
// styling material ui for later: https://stackoverflow.com/questions/48319372/changing-font-family-of-all-material-uiversion-1-components

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

const StyledButton = withStyles({
	root: {
		background: 'maroon',
		color: 'white',
		padding: '5px 20px 5px 20px',
		border: "2px solid maroon",
		'font-family': 'Roboto',
		'&:hover': {
			background: 'white',
			color: 'maroon',
			"font-weight": "bold",
		}

	},
})(Button);

class Quiz extends React.Component {
    state = {
        showMajor2: false,
        showMinor2: false,

        major1: "None",
        major2: "None",
        minor1: "None",
        minor2: "None",
        gender: "Prefer not to say"
    };

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value}, () =>
            {console.log(this.state);}
        );
        console.log(name);
        console.log(value);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // https://css-tricks.com/using-fetch/
    handleSubmit = event => {
        let data = {
            userMajor: [this.state.major1, this.state.major2],
            userMinor: [this.state.minor1, this.state.minor2],
            userGender: this.state.gender
        };
        console.log(data);

        fetch('https://aggieorgs-backend-270016.appspot.com/api/v1/user/27ea0040-5d82-11ea-bf1c-8b58b3001807', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success: ', data);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    }

    addMajorClickHandler = () => {
        this.setState({showMajor2: true});
    }

    removeMajorClickHandler = () => {
        this.setState({showMajor2: false, major2: "None"});
    }

    addMinorClickHandler = () => {
        this.setState({showMinor2: true});
    }

    removeMinorClickHandler = () => {
        this.setState({showMinor2: false, minor2: "None"});
    }

    render() {
        let majors = ["None", "Computer Science", "Computing", "Computer Engineering"];
        let majorDegrees = majors.map((major) =>
            <MenuItem value={major}>{major}</MenuItem>
        );

        let secondMajor;

        if (this.state.showMajor2) {
            secondMajor = <div>
                <FormControl style={{'margin-left': 20, minWidth: 200}}>
                    <Select
                        labelId="major2-label"
                        id="major2"
                        name="major2"
                        value={this.state.major2}
                        onChange={this.handleChange}
                    >
                        {majorDegrees}
                    </Select>
                </FormControl>
                <StyledButton style={{'margin-left': 20}} onClick={this.removeMajorClickHandler}>Remove major</StyledButton>
            </div>

        }
        else {
            secondMajor = <StyledButton style={{'margin-left': 20}} onClick={this.addMajorClickHandler}>Add new major</StyledButton>
        }

        let minors = ["None", "Computer Science", "Computing", "Computer Engineering", "Cybersecurity"];
        let minorDegrees = minors.map((minors) =>
            <MenuItem value={minors}>{minors}</MenuItem>
        );
        
        let secondMinor;

        if (this.state.showMinor2) {
            secondMinor = <div>
                <FormControl style={{'margin-left': 20, minWidth: 200}}>
                    <Select
                        labelId="minor2-label"
                        id="minor2"
                        name="minor2"
                        value={this.state.minor2}
                        onChange={this.handleChange}
                    >
                        {minorDegrees}
                    </Select>
                </FormControl>
                <StyledButton style={{'margin-left': 20}} onClick={this.removeMinorClickHandler}>Remove minor</StyledButton>
            </div>

        }
        else {
            secondMinor = <StyledButton style={{'margin-left': 20}} onClick={this.addMinorClickHandler}>Add new minor</StyledButton>
        }


        return (
            <div style={indexStyle}>
                <SideNavLayout />   
                <body>
                <h1>Welcome to AggieOrgs, NAME.</h1>
                <p>Descriptive text.</p>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"

                >
                    <FormControl style={{minWidth: 200}}>
                        <p2>Your major:</p2>
                        <Select 
                            labelId="major1-label"
                            id="major1"
                            name="major1"
                            value={this.state.major1}
                            onChange={this.handleChange}
                        >
                            {majorDegrees}
                        </Select>
                        
                    </FormControl>
                    {secondMajor}
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                >
                    <FormControl style={{minWidth: 200}}>
                        <p2>Your minor:</p2>
                        <Select 
                            labelId="minor1-label"
                            id="minor1"
                            name="minor1"
                            value={this.state.minor1}
                            onChange={this.handleChange}
                        >
                            {minorDegrees}
                        </Select>
                    </FormControl>
                    {secondMinor}
                </Grid>
                <p />
                <br />
                <p2>Gender</p2>
                <RadioGroup aria-label="gender" name="gender"  value={this.state.gender} onChange={this.handleChange} style={{'margin-top': 10}} row>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel value="prefer not to say" control={<Radio />} label="Prefer not to say" />
                </RadioGroup>
                <br /> <br />
                <StyledButton 
                    onClick={this.handleSubmit}
                >
                    <Link href="/interests" style={{color:'white'}}>
                        Interests ->
                    </Link>
                </StyledButton>
                </body>
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                    h1 {
                        font-family: 'Muli';
                        font-size: 48px;
                    }
                    p {
                        font-family: 'Roboto';
                        font-size: 24px;
                        max-width: 700px;
                    }
                    p2 {
                        font-family: 'Roboto';
                        font-size: 18px;
                        margin-bottom: 15px;
                        margin-top: 40px;
                    }
                    

                `}</style> 
            </div>
            
        );
    }
}

export default Quiz;