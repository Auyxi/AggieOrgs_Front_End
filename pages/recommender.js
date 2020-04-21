
import React from 'react';
import Card from "../components/Card/Card";
import SideNavLayout from "../components/SideNavLayout";
import fetch from 'isomorphic-fetch';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles'

var store = require('store');
var queue = [];

// https://www.robinwieruch.de/react-fetching-data to show how to make the components update in time

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%"
};

class Recommender extends React.Component {
    constructor() {
        super();
        this.state = {
            recs: [],
            data: {}
        }
        this.likeOrg = this.likeOrg.bind(this);
        this.dislikeOrg = this.dislikeOrg.bind(this);
    }

    componentDidMount() {
        if (queue.length === 0) {
            var recAPI = "https://api.aggieorgs.com/api/v1/recommendation?userId=" + store.get('id') + "&numOrgs=5"
            fetch(recAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.get('user').id
                }
            })
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => queue.push(element.orgId));
                console.log(queue);
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
            .then(() => {
                var nextOrg = queue.pop();
                var orgAPI = 'https://api.aggieorgs.com/api/v1/organization/' + nextOrg;

                fetch(orgAPI)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({data: data}, () => 
                        {console.log(this.state);}
                    );
                });
            })
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked }, () =>
            {console.log(this.state);}
        );
    }

    likeOrg() {
        console.log("liked");
        var likedAPI = "https://api.aggieorgs.com/api/v1/account/" + store.get('id') + ":likeOrg"
        var sendBody = { orgId : this.state.data.orgId };

        fetch(likedAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.get('user').id
            },
            body : JSON.stringify(sendBody)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success - POST: ', data);
        })
        .then(() => {
            var nextOrg = queue.pop();
            var orgAPI = 'https://api.aggieorgs.com/api/v1/organization/' + nextOrg;

            fetch(orgAPI)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({data: data}, () => 
                    {console.log(this.state);}
                );
            });
        })
        .catch((error) => {
            console.log(error);
        })

        if (queue.length < 3) {
            var recAPI = "https://api.aggieorgs.com/api/v1/recommendation?userId=" + store.get('id') + "&numOrgs=5"
            fetch(recAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.get('user').id
                }
            })
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => queue.push(element.orgId));
                console.log(queue);
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
        }
    }

    dislikeOrg() {
        console.log("dislike");
        var likedAPI = "https://api.aggieorgs.com/api/v1/account/" + store.get('id') + ":dislikeOrg"
        var sendBody = { orgId : this.state.data.orgId };

        fetch(likedAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.get('user').id
            },
            body : JSON.stringify(sendBody)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success - POST: ', data);
        })
        .then(() => {
            var nextOrg = queue.pop();
            var orgAPI = 'https://api.aggieorgs.com/api/v1/organization/' + nextOrg;

            fetch(orgAPI)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({data: data}, () => 
                    {console.log(this.state);}
                );
            });
        })
        .catch((error) => {
            console.log(error);
        })

        if (queue.length < 3) {
            var recAPI = "https://api.aggieorgs.com/api/v1/recommendation?userId=" + store.get('id') + "&numOrgs=5"
            fetch(recAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.get('user').id
                }
            })
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => queue.push(element.orgId));
                console.log(queue);
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
        }
    }

    render() {
        return (
            <div style={indexStyle}>
                <Head>
                    <title>Recommender - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                <h1>Here are your recommended organizations.</h1>

                <Card 
                    orgName = {this.state.data.orgName}
                    purpose = {this.state.data.orgPurpose}
                    dues = {this.state.data.orgMembershipFee}
                    conName = "None"
                    conEmail = {this.state.data.orgEmail}
                    time = {this.state.data.orgTimeCommitment}
                    tags = {this.state.data.orgTags}
                    liked = {this.likeOrg}
                    disliked = {this.dislikeOrg}
                />

                <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylyski for CSCE 482 @ TAMU</footer>
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                    h1 {
                        font-family: 'Muli';
                        font-size: 48px;
                        margin-left: 100px;
                        margin-top: 50px;
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
            </div>
        );
    }
}
export default Recommender;