import SideNavLayout from "../components/SideNavLayout";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { MenuItem } from "@material-ui/core";

// using material-ui now https://material-ui.com/components/selects/
// dynamic forms for later https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// react forms doc https://reactjs.org/docs/forms.html

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

class Quiz extends React.Component {
    state = {
        Major: "None"
    };

    handleChange = event => {
        this.setState({Major: event.target.value});
    }

    render() {
        return (
            <div style={indexStyle}>
                <SideNavLayout />
                <h1>Welcome to AggieOrgs, NAME.</h1>
                <p>Descriptive text.</p>
                <FormControl>
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
                <button>Add new major</button>
            </div>
        );
    }
}

export default Quiz;