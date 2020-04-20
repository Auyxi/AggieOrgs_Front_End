import React from 'react';
import Head from 'next/head';
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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%"
    //height: "100%",
    //padding: '100px'
};

const myTheme = createMuiTheme({
    palette: {
        secondary: {
            main: "#500000"
        },
        primary: {
            main: '#500000'
        },
        formControl: {
            color: "black"
        }
    }
}); 

const StyledButton = withStyles({
    root: {
        background: '#500000',
        color: 'white',
        padding: '5px 20px 5px 20px',
        border: "2px solid #500000",
        'font-family': 'Roboto',
        'text-decoration': 'none',
        'margin-left': '100px',
        '&:hover': {
            background: 'white',
            color: 'maroon',
            "font-weight": "bold",
        }

    },
})(Button);

const StyledToggle = withStyles({
    root: {
        background: 'white',
        color: '#800000',
        padding: '5px 20px 5px 20px',
        border: '2px solid #800000',
        'font-family': 'Roboto',
        'text-decoration': 'none',
        'margin-right': '30px',
        'margin-bottom': '30px',
        '&:hover': {
            backgroundColor: 'fade(#800000, .2)',
            color: '#800000',
            //"font-weight": "bold",
        },
        '&:selected': {
            background: '#800000',
            color: 'white',
            "font-weight": "bold",
        },
    },

})(ToggleButton);

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
                <Head>
                    <title>Interests - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                <body>
                    <h1>Welcome to AggieOrgs, NAME.</h1>
                    <p>What are you looking for in an organization?</p>
                    <div className = "checks">
                        <FormControl component="fieldset">
                            <FormLabel component="legend"></FormLabel>
                                <FormGroup>
                                    <MuiThemeProvider theme={myTheme}>
                                    <div className = "row1">
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
                                    </div>
                                    <div className = "row2">
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
                                    </div>

                                    <div className = "row3">
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
                                    </div>
                                    </MuiThemeProvider>

                                </FormGroup>
                            <FormHelperText> Click button when done</FormHelperText>
                        </FormControl>
                    </div>


                    <StyledButton 
                        onClick={this.handleSubmit}
                        color="secondary"
                        variant="contained"
                        href='/recommender'>
                            Recommender ->
                    </StyledButton>
                    <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylyski for CSCE 482 @ TAMU</footer>
                    <style jsx>{`
                        @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                        h1 {
                        font-family: 'Muli';
                        font-size: 48px;
                        margin-left: 100px;
                        padding-top: 50px;
                    }
                    p {
                        font-family: 'Roboto';
                        font-size: 24px;
                        max-width: 700px;
                        margin-left: 100px;
                    }
                    p2 {
                        font-family: 'Roboto';
                        font-size: 18px;
                        margin-bottom: 15px;
                        margin-top: 40px;
                    }
                    .checks {
                        margin-left: 100px;
                        margin-bottom: 50px;

                    }
                    .checks div{
                        display: block;
                        padding-bottom: 20px;
                    }
                    .MuiRadio-colorPrimary {
                        color: #500000;
                    }
                    body {
                        ///width: 100%;
                        //height: 100%;
                        //margin: 100px;
                    }
                    footer{
                        text-align: center;
                        width: 100%;
                        font-family: 'Roboto';
                        font-size: 14px;
                        color: #a7a7a7;
                        position: absolute;
                        bottom: 0;
                        padding-bottom: 10px;
                    }

                    `}</style>
                    </body> 
            </div>
        ); 
    } 
}

export default Interests;