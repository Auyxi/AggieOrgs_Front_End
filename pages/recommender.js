
import React from 'react';
import Card from "../components/CardLayout";
import SideNavLayout from "../components/SideNavLayout";
import fetch from 'isomorphic-fetch';
import { withStyles } from '@material-ui/core/styles'

// https://www.robinwieruch.de/react-fetching-data to show how to make the components update in time

const indexStyle = {
    "border-top": "20px solid #500000",
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

                <Card 
                    orgName = "Dance Arts Society"
                    purpose = "The purpose and objectives of this 
                        organization shall be to allow members to 
                        choreograph dances (ballet, tap, jazz, hip 
                        hop, modern, and contemporary) for members 
                        of the Bryan/College Station Community, who want 
                        to perform..."
                    tags = "tag1, tag2, tag3, tag4, tag5, tag6"
                />


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
export default Recommender;