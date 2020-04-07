import React from 'react';
import SideNavLayout from "../components/SideNavLayout";
import fetch from 'isomorphic-fetch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

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
        );
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
                    #card {
                        width: 400px;

                    }
                    

                `}</style> 
            </div>
        );
    }
}

export default Recommender;