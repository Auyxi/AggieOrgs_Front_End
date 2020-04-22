import SideNavLayout from "../components/SideNavLayout";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Router from 'next/router'
import React from 'react';
import Head from 'next/head';
import { MenuItem } from "@material-ui/core";
//import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
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

// using material-ui now https://material-ui.com/components/selects/
// dynamic forms for later https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// react forms doc https://reactjs.org/docs/forms.html
// styling material ui for later: https://stackoverflow.com/questions/48319372/changing-font-family-of-all-material-uiversion-1-components

// fixing redirect https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page

const indexStyle = {
    "border-top": "20px solid #500000",
};

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
			color: '#500000',
			"font-weight": "bold",
		}

	},
})(Button);

const myTheme = createMuiTheme({
    palette: {
        secondary: {
            main: "#500000"
        },
        formControl: {
            color: "black"
        }
    }
}); 

class Quiz extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",

            showMajor2: false,
            showMinor2: false,
    
            major1: "None",
            major2: "None",
            minor1: "None",
            minor2: "None",
            gender: "Prefer not to say"
        };
    }

    componentDidMount() {
        this.setState({
            token: store.get('user').id
        });

        if (!store.get('user').isSignedIn) {
            Router.replace("/account");
        }

        if (store.get('filled')) {
            Router.replace("/recommender");
        }
    }

    componentDidUpdate() {
        const {pathname} = Router;
        if (pathname == '/quiz' && !store.get('id')) {
            Router.replace('/account');
        }

        if (pathname == '/quiz' && store.get('filled')) {
            Router.replace("/recommender");
        }
    }

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
        let majors = ["None", "Accounting", "Aerospace Engineering", "Agribusiness", "Agricultural Communications & Journalism",
                "Agricultural Economics", "Agricultural Leadership & Development", "Agricultural Science", "Agricultural Systems Management",
                "Animal Science", "Anthropology", "Applied Mathematical Sciences", "Agricultural Engineering", "Biochemistry",
                "Bioenvironmental Sciences", "Biological & Agricultural Engineering", "Biology", "Biomedical Engineering", "Biomedical Sciences",
                "Business Honors", "Chemical Engineering", "Chemistry", "Civil Engineering", "Classics", "Civil Engineering", "Communication",
                "Community Health", "Computer Engineering", "Computer Science", "Computing", "Construction Science", "Ecological Restoration",
                "Economics", "Electrical Engineering", "Electronic Systems Engineering Technology", "English", "Entomology", "Environmental Design",
                "Environmental Engineering", "Environmental Geosciences", "Environmental Studies (COALS)", "Environmental Studies (Geosciences)", 
                "Finance", "Food Science & Technology", "Food Systems Industry Management", "Forensic & Investigative Sciences", "Forestry", 
                "General Studies", "Genetics", "Geographic Information Science & Technology", "Geography", "Geology", "Geophysics", "Health",
                "History", "Horticulture", "Human Resource Development", "Industrial Distribution", "Industrial Engineering", "Interdisciplinary Engineering",
                "Education", "International Studies", "Kinesiology", "Landscape Architecture", "Management", "Managment Information Systems",
                "Manufacturing and Mechanical Engineering Technology", "Marine Biology", "Marketing", "Mathematics", "Mechanical Engineering",
                "Meteorology", "Microbiology", "Modern Languages", "Nuclear Engineering", "Nursing", "Nutritional Sciences", "Oceanography", "Ocean Engineering", 
                "Performance Studies", "Petroleum Engineering", "Philosophy", "Physics", "Soil Science", "Political Science", "Poultry Science",
                "Psychology", "Public Health", "Rangeland Ecology and Management", "Tourism Sciences", "Sociology", "Spanish", "Spatial Sciences",
                "Sport Management", "Statistics", "Supply Chain Management", "Technology Management", "Telecommunication Media Studies", "Turfgrass Science",
                "University Studies", "Urban and Regional Planning", "Visualization", "Wildlife and Fisheries Sciences", "Women's and Gender Studies", "Zoology"];
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

        let minors = ["None", "Accounting", "Aerospace Engineering", "Agribusiness", "Agricultural Communications & Journalism",
                "Agricultural Economics", "Agricultural Leadership & Development", "Agricultural Science", "Agricultural Systems Management",
                "Animal Science", "Anthropology", "Applied Mathematical Sciences", "Agricultural Engineering", "Biochemistry",
                "Bioenvironmental Sciences", "Biological & Agricultural Engineering", "Biology", "Biomedical Engineering", "Biomedical Sciences",
                "Business Honors", "Chemical Engineering", "Chemistry", "Civil Engineering", "Classics", "Civil Engineering", "Communication",
                "Community Health", "Computer Engineering", "Computer Science", "Computing", "Construction Science", "Ecological Restoration",
                "Economics", "Electrical Engineering", "Electronic Systems Engineering Technology", "English", "Entomology", "Environmental Design",
                "Environmental Engineering", "Environmental Geosciences", "Environmental Studies (COALS)", "Environmental Studies (Geosciences)", 
                "Finance", "Food Science & Technology", "Food Systems Industry Management", "Forensic & Investigative Sciences", "Forestry", 
                "General Studies", "Genetics", "Geographic Information Science & Technology", "Geography", "Geology", "Geophysics", "Health",
                "History", "Horticulture", "Human Resource Development", "Industrial Distribution", "Industrial Engineering", "Interdisciplinary Engineering",
                "Education", "International Studies", "Kinesiology", "Landscape Architecture", "Management", "Managment Information Systems",
                "Manufacturing and Mechanical Engineering Technology", "Marine Biology", "Marketing", "Mathematics", "Mechanical Engineering",
                "Meteorology", "Microbiology", "Modern Languages", "Nuclear Engineering", "Nursing", "Nutritional Sciences", "Oceanography", "Ocean Engineering", 
                "Performance Studies", "Petroleum Engineering", "Philosophy", "Physics", "Soil Science", "Political Science", "Poultry Science",
                "Psychology", "Public Health", "Rangeland Ecology and Management", "Tourism Sciences", "Sociology", "Spanish", "Spatial Sciences",
                "Sport Management", "Statistics", "Supply Chain Management", "Technology Management", "Telecommunication Media Studies", "Turfgrass Science",
                "University Studies", "Urban and Regional Planning", "Visualization", "Wildlife and Fisheries Sciences", "Women's and Gender Studies", "Zoology"];
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

        var name = store.get('user').firstName;
        return (
            <div style={indexStyle}>
                <Head>
                    <title>Quiz - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />   
                <body>
                    <h1>Welcome to AggieOrgs, {name}.</h1>
                    <p>This is the Student Organization Recommender. Please select your major, minor, and gender to give us a better idea of what organizations would be right for you.</p>
                    <div className = "gridContainer">
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
                        <MuiThemeProvider theme={myTheme}>
                            <RadioGroup aria-label="gender" name="gender"  value={this.state.gender} onChange={this.handleChange} style={{'margin-top': 10}} row>
                                <FormControlLabel color="secondary" value="male" control={<Radio />} label="Male" />
                                <FormControlLabel color="secondary" value="female" control={<Radio />} label="Female" />
                                <FormControlLabel color="secondary" value="other" control={<Radio />} label="Other" />
                                <FormControlLabel color="secondary" value="prefer not to say" control={<Radio />} label="Prefer not to say" />
                            </RadioGroup>
                        </MuiThemeProvider>    
                    </div>
                    <StyledButton 
                        onClick={this.handleSubmit}
                        href='/interests'
                    >
                            Interests ->
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
                        max-width: 900px;
                        margin-left: 100px;
                    }
                    p2 {
                        font-family: 'Roboto';
                        font-size: 18px;
                        margin-bottom: 15px;
                        margin-top: 40px;
                    }
                    .gridContainer {
                        margin-left: 100px;
                        margin-bottom: 30px;

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

export default Quiz;