import React from 'react';
import SideNavLayout from "../components/SideNavLayout";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import fetch from 'isomorphic-fetch'
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

const StyledButton = withStyles({
    root: {
        background: '#800000',
        color: 'white',
        padding: '5px 20px 5px 20px',
        border: "2px solid #800000",
        'font-family': 'Roboto',
        'text-decoration': 'none',
        '&:hover': {
            background: 'white',
            color: 'maroon',
            "font-weight": "bold",
        }

    },
})(Button);

class Interests extends React.Component {
    state = {
        Academic: false,
        Religious: false,
        "Fine Arts": false
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked }, () =>
            {console.log(this.state);}
        );
    }

    handleSubmit = event => {
        let categories = [];

        for (let [key, value] of Object.entries(this.state)) {
            if (value === true) {
                categories.push(key);
            }
        }

        let data = {
            userInterestTags: categories
        };

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

    render() {
        return (
            <div style={indexStyle}>
                <SideNavLayout />
                <h1>Welcome to AggieOrgs, NAME.</h1>
                <p>Descriptive text.</p>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose categories of interest.</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.Academic} onChange={this.handleChange('Academic')} value="academic" />}
                                label="Academic"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.Religious} onChange={this.handleChange('Religious')} value="religious" />}
                                label="Religious"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={this.state['Fine Arts']} onChange={this.handleChange('Fine Arts')} value="fineArts" />
                                }
                                label="Fine Arts"
                            />
                        </FormGroup>
                    <FormHelperText> Click button when done</FormHelperText>
                </FormControl>

                <div className="toggleButtons">
                    <ToggleButton value="academic"> Academic </ToggleButton>
                    <ToggleButton value="religious"> Religious </ToggleButton>
                    <ToggleButton value="fineArts"> Fine Arts </ToggleButton>
                </div>

                <StyledButton 
                    onClick={this.handleSubmit}
                    color="secondary"
                    variant="contained"
                    href='/recommender'>
                        Recommender ->
                </StyledButton>
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

export default Interests;