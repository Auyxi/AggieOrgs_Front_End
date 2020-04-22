
import React from 'react';
import Card from "../components/Card/Card";
import SideNavLayout from "../components/SideNavLayout";
import fetch from 'isomorphic-fetch';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

var store = require('store');
var queue = [];

// https://www.robinwieruch.de/react-fetching-data to show how to make the components update in time

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%"
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
            color: 'maroon',
            "font-weight": "bold",
        }

    },
})(Button);

class Recommender extends React.Component {
    constructor() {
        super();
        this.state = {
            recs: [],
            data: {},
            loading: true
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
                    this.setState({
                        data: data,
                        loading: false
                    }, () => {
                        console.log(this.state);
                    });
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
        this.setState({
            loading: true
        });
    
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
                this.setState({data: data, loading: false}, () => 
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
        this.setState({
            loading: true
        });

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
                this.setState({data: data, loading: false}, () => 
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

    loading() {
        return (
            <div>
                <div className="loader"></div>

                <style jsx>{`
                    .loader {
                        border: 16px solid #f3f3f3; /* Light grey */
                        border-top: 16px solid #500000;
                        border-radius: 50%;
                        width: 120px;
                        height: 120px;
                        animation: spin 2s linear infinite;
                        margin: 0;
                        position: absolute;
                        top: 45%;
                        left: 45%;
                        transform: translate(-50%, -50%);
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    pref() {
        store.set('filled', false);
    }

    render() {
        var display;
        if (this.state.loading) {
            display = this.loading();
        }
        else {
            display = <Card 
                        orgName = {this.state.data.orgName}
                        purpose = {this.state.data.orgPurpose}
                        dues = {this.state.data.orgMembershipFee}
                        conName = "None"
                        conEmail = {this.state.data.orgEmail}
                        time = {this.state.data.orgTimeCommitment}
                        tags = {this.state.data.orgTags}
                        liked = {this.likeOrg}
                        disliked = {this.dislikeOrg}
                    />;
        }

        return (
            <div style={indexStyle}>
                <Head>
                    <title>Recommender - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                <h1>Here are your recommended organizations.</h1>
                <p href = "/interests">Click here to update your preferences.</p>
                <Link href="/quiz">
                    <StyledButton
                        onClick = {this.pref()}
                        color="secondary"
                        variant="contained"
                    >
                        Preferences                            
                    </StyledButton>
                </Link>

                {display}

                <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylski for CSCE 482 @ TAMU</footer>
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