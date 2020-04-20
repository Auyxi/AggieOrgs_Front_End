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

var store = require('store');

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
    //height: "100%",
    //padding: '100px'
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
    constructor(props) {
        super(props)

        this.state = {
            token: "",

            Academic: false,
            Religious: false,
            "Fine Arts": false
        };
    }

    componentDidMount() {
        this.setState({
            token: store.get('user').id
        });
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

        fetch('https://api.aggieorgs.com/api/v1/account/'.concat(store.get('id')), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
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
                        <StyledToggle value="academic" > Academic </StyledToggle>
                        <StyledToggle value="religious"> Religious </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>
                        <StyledToggle value="fineArts"> Fine Arts </StyledToggle>

                    </div>

                    <StyledButton 
                        onClick={this.handleSubmit}
                        color="secondary"
                        variant="contained"
                        href='/recommender'
                    >
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
                        body{
                            padding: 100px;
                            width: 100%;
                            height: 100%;
                            overflow: hidden; 
                            left: 0;
                            top:0;
                        }

                        .toggleButtons {
                            max-width: 900px;
                        }
                    `}</style>
                    </body> 
            </div>
        ); 
    } 
}

export default Interests;