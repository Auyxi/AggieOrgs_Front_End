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

var store = require('store');

if (!store.get('user')) {
    store.set('user', {
        id: "",
        firstName: "",
        lastName: "",
        isSignedIn: false,
    })
}

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
        store.set('filled', true);
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
        var text = "<- Quiz"
        var name = store.get('user').firstName;
        return (
            <div style={indexStyle}>
                <Head>
                    <title>Interests - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                <body>
                    <h1>Welcome to AggieOrgs, {name}.</h1>
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
                                            control={<Checkbox checked={this.state['Arts/Entertainment']} onChange={this.handleChange('Arts/Entertainment')} value="artsEntertainment" />}
                                            label="Arts/Entertainment"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Greek Life']} onChange={this.handleChange('Greek Life')} value="greekLife" />
                                            }
                                            label="Greek Life"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Internatiional} onChange={this.handleChange('Internatiional')} value="internatiional" />}
                                            label="International/Multicultural"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Leadership} onChange={this.handleChange('Leadership')} value="leadership" />}
                                            label="Leadership/Governance"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Military']} onChange={this.handleChange('Military')} value="military" />
                                            }
                                            label="Military"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Politics']} onChange={this.handleChange('Politics')} value="politics" />
                                            }
                                            label="Politics/Advocacy"
                                        />
                                    </div>
                                    <div className = "row2">
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Career} onChange={this.handleChange('Career')} value="career" />}
                                            label="Professional/Career"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Recreation} onChange={this.handleChange('Recreation')} value="recreation" />}
                                            label="Recreation/Sports"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Religious']} onChange={this.handleChange('Religious')} value="religious" />
                                            }
                                            label="Religious"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Residence} onChange={this.handleChange('Residence')} value="residence" />}
                                            label="Residence Halls"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Service} onChange={this.handleChange('Service')} value="service" />}
                                            label="Service"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Social']} onChange={this.handleChange('Social')} value="Social" />
                                            }
                                            label="Social"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['SpecialInterests']} onChange={this.handleChange('SpecialInterests')} value="specialInterests" />
                                            }
                                            label="Special Interests"
                                        />
                                    </div>

                                    <div className = "row3">
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Business} onChange={this.handleChange('Business')} value="business" />}
                                            label="Business"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Engineering} onChange={this.handleChange('Engineering')} value="engineering" />}
                                            label="Engineering"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Spirit']} onChange={this.handleChange('Spirit')} value="spirit" />
                                            }
                                            label="Spirit and Tradition"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.LiberalArts} onChange={this.handleChange('LiberalArts')} value="liberalArts" />}
                                            label="Liberal Arts"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.Graduate} onChange={this.handleChange('Graduate')} value="graduate" />}
                                            label="Graduate School"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Health']} onChange={this.handleChange('Health')} value="health" />
                                            }
                                            label="Health"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={this.state['Government']} onChange={this.handleChange('Government')} value="government" />
                                            }
                                            label="Student Government"
                                        />
                                    </div>
                                    </MuiThemeProvider>
                                </FormGroup>
                            <FormHelperText> Click button when done</FormHelperText>
                        </FormControl>
                    </div>

                    <Link href="/quiz">
                        <StyledButton 
                            color="secondary"
                            variant="contained"
                            
                        >
                            {text}                            
                       </StyledButton>
                    </Link>
                    <StyledButton 
                        onClick={this.handleSubmit}
                        color="secondary"
                        variant="contained"
                        href='/recommender'
                    >
                            Recommender ->
                    </StyledButton>
                    <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylski for CSCE 482 @ TAMU</footer>
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