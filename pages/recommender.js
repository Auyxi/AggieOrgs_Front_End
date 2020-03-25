import React from 'react';
import SideNavLayout from "../components/SideNavLayout";
import fetch from 'isomorphic-fetch'

// https://www.robinwieruch.de/react-fetching-data to show how to make the components update in time

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

class Recommender extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        fetch('https://aggieorgs-backend-270016.appspot.com/api/v1/organization/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({data: data}, () => 
                {console.log(this.state);}
            );
        });
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked }, () =>
            {console.log(this.state);}
        };
    }

    render() {
        return (
            <div style={indexStyle}>
                <SideNavLayout />
                <h1>Welcome to AggieOrgs, NAME.</h1>
                <p>Descriptive text.</p>
                <p>{this.state.data.orgId}</p>
                <p>{this.state.data.userFirstName}</p>
                <p>{this.state.data.userLastName}</p>
            </div>
        );
    }
}

export default Recommender;