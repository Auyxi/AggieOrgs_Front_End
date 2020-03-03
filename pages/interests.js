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

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

class Interests extends React.Component {
    state = {
        academic: false,
        religious: false,
        fineArts: false
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked }, () =>
            {console.log(this.state);}
        );
    }

    handleSubmit = event => {
        
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
                                control={<Checkbox checked={this.state.academic} onChange={this.handleChange('academic')} value="academic" />}
                                label="Academic"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.religious} onChange={this.handleChange('religious')} value="religious" />}
                                label="Religious"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={this.state.fineArts} onChange={this.handleChange('fineArts')} value="fineArts" />
                                }
                                label="Fine Arts"
                            />
                        </FormGroup>
                    <FormHelperText>Click button when done</FormHelperText>
                </FormControl>

                <Button 
                    onClick={this.handleSubmit}
                    color="secondary"
                    variant="contained"
                >
                    <Link href="/recommender">
                        Recommender ->
                    </Link>
                </Button>
            </div>
        ); 
    } 
}

export default Interests;