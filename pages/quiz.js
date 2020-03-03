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
import Button from '@material-ui/core/Button';
import Link from 'next/link';

// using material-ui now https://material-ui.com/components/selects/
// dynamic forms for later https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// react forms doc https://reactjs.org/docs/forms.html
// styling material ui for later: https://stackoverflow.com/questions/48319372/changing-font-family-of-all-material-uiversion-1-components

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

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
    handleSubmit = event => {
        let data = {
            major1: this.state.major1,
            major2: this.state.major2,
            minor1: this.state.minor1,
            minor2: this.state.minor2,
            gender: this.state.gender
        };
        console.log(data);

        /* fetch('urlexample', {
            method: 'POST',
            headers: {

            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success: ', data);
        })
        .catch((error) => {
            console.error('Error: ', error);
        }); */
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
                <FormControl>
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
                <button onClick={this.removeMajorClickHandler}>Remove major</button>
            </div>

        }
        else {
            secondMajor = <button onClick={this.addMajorClickHandler}>Add new major</button>
        }

        let minors = ["None", "Computer Science", "Computing", "Computer Engineering", "Cybersecurity"];
        let minorDegrees = minors.map((minors) =>
            <MenuItem value={minors}>{minors}</MenuItem>
        );
        
        let secondMinor;

        if (this.state.showMinor2) {
            secondMinor = <div>
                <FormControl>
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
                <button onClick={this.removeMinorClickHandler}>Remove minor</button>
            </div>

        }
        else {
            secondMinor = <button onClick={this.addMinorClickHandler}>Add new minor</button>
        }


        return (
            <div style={indexStyle}>
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
                    div {
                        padding: 80px 100px;
                    }
                `}</style>            
                <SideNavLayout />
                <h1>Welcome to AggieOrgs, NAME.</h1>
                <p>Descriptive text.</p>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <FormControl>
                        <p>Your major:</p>
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
                    alignItems="center"
                >
                    <FormControl>
                        <p>Your minor:</p>
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

                <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel value="prefer not to say" control={<Radio />} label="Prefer not to say" />
                </RadioGroup>

                <Button 
                    onClick={this.handleSubmit}
                    color="secondary"
                    variant="contained"
                >
                    <Link href="/interests">
                        Interests ->
                    </Link>
                </Button>
            </div>
        );
    }
}

export default Quiz;