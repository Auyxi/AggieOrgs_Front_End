import SideNavLayout from "../components/SideNavLayout";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { MenuItem } from "@material-ui/core";
//import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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
        Major: "None",
        Minor: "None"
    };

    handleChange = event => {
        this.setState({Major: event.target.value});
    }

    render() {
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
                <p>Please fill out this preliminary form to help us better suggest relevant organizations to you.</p>
                <FormControl style={{minWidth: 400}}>
                    <InputLabel id="majors">Your major:</InputLabel>
                    <Select 
                        labelId="major-1-label"
                        id="major-1"
                        value={this.state.Major}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                        <MenuItem value="Computing">Computing</MenuItem>
                    </Select>
                </FormControl>
                <Button style={{"margin-left": 30},{"margin-top": 15}}>Add second major</Button> 
            
                <FormControl style={{minWidth: 400}}>
                    <InputLabel id="minors">Your minor:</InputLabel>
                    <Select 
                        labelId="minot-1-label"
                        id="minor-1"
                        value={this.state.Minor}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                        <MenuItem value="Computing">Computing</MenuItem>
                    </Select>
                </FormControl>
                <Button style={{"margin-left": 30},{"margin-top": 15}}>Add second minor</Button> 

            </div>
        );
    }
}

export default Quiz;