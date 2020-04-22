import SideNavLayout from "../components/SideNavLayout";
import Head from 'next/head';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

var store = require('store');

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

// https://www.intricatecloud.io/2019/08/adding-google-sign-in-to-your-webapp-a-react-example/

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%",
};

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            isSignedIn: false,
        }

        this.signOut = this.signOut.bind(this);
        this.clearInfo = this.clearInfo.bind(this);
    }

    componentDidMount() {
        const successCallback = this.onSuccess.bind(this);

        window.gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '885116149069-l3gf8s48u5asqd27vseqbh9kcho9ursl.apps.googleusercontent.com',
            })

            
            window.gapi.load('signin2', function() {
                var opts = {
                    width: 200,
                    height: 50,
                    longtitle: true,
                    theme: 'dark',
                    onsuccess: successCallback,
                };

                gapi.signin2.render('loginButton', opts);
            })
            
        })
    }

    onSuccess() {
        let auth2 = gapi.auth2.getAuthInstance();
        var profile = auth2.currentUser.get().getBasicProfile();

        this.setState({
            id: auth2.currentUser.get().getAuthResponse().id_token,
            firstName: profile.getGivenName(),
            lastName: profile.getFamilyName(),
            isSignedIn: true
        }, () => {
            store.set('user', this.state);
        });

        // send id token to backend in JSON
        let data = {
            emailAddress: profile.getEmail(),
            userFirstName: profile.getGivenName(),
            userLastName: profile.getFamilyName(),
        };
        console.log(data);

        fetch('https://api.aggieorgs.com/api/v1/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.id
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success - GET: ', data);
            store.set('id', data.userId);
            if (data.userInterestTags.length != 0) {
                store.set('filled', true);
            } 
            else {
                store.set('filled', false);
            }
        })
        .catch((error) => {
            fetch('https://api.aggieorgs.com/api/v1/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.id
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success - POST: ', data);
                store.set('id', data.userId);
                store.set('filled', false); 
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
        });
    }

    signOut() {
        let auth2 = gapi.auth2.getAuthInstance();

        store.set('user', this.state);
        store.remove('id');
        store.remove('filled');
        console.log(store.get('user'));
        
        this.setState({
            isSignedIn: false
        });
        auth2.signOut(); 

        console.log('User signed out.');
    }

    clearInfo() {
        let data = {
            userInterestOrgsId: [],
            userDislikeOrgsId: [],
            userGender: this.state.gender
        };
        console.log(data);

        fetch('https://api.aggieorgs.com/api/v1/account/'.concat(store.get('id')), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.id
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

    getContent() {
        const signOut = this.signOut.bind(this);

        if (!store.get('user')) {
            store.set('user', this.state);
        }

        if (this.state.isSignedIn) {
            return (
                <div>
                    <h1>Welcome to AggieOrgs, {this.state.firstName}</h1>
                    <StyledButton 
                        onClick={this.clearInfo}
                        color="secondary"
                        variant="contained"
                    >
                            Clear saved organisations / reset recommendations
                    </StyledButton>
                    <StyledButton 
                        onClick={this.signOut}
                        color="secondary"
                        variant="contained"
                    >
                            Sign out of Google
                    </StyledButton>
                    <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylski for CSCE 482 @ TAMU</footer>
                    <style jsx>{`
                        @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                        h1 {
                            font-family: 'Muli';
                            font-size: 48px;
                            padding-top: 50px;
                            margin-left: 100px;
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
                        footer {
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
            )
        } 
        else {
            return (
                <div>
                    <h1>Welcome to AggieOrgs.</h1>
                    <p>Please sign in to view your account and access other functionality in the website.</p>
                    <p2>You are not signed in. Click here to sign in.</p2>
                    <div id="loginButton"></div>
                    <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylski for CSCE 482 @ TAMU</footer>
                    <style jsx>{`
                        @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                        h1 {
                            font-family: 'Muli';
                            font-size: 48px;
                            padding-top: 50px;
                            padding-left: 100px;
                        }
                        p {
                            font-family: 'Roboto';
                            font-size: 24px;
                            max-width: 900px;
                            padding-left: 100px;
                        }
                        p2 {
                            font-family: 'Roboto';
                            font-size: 18px;
                            margin-bottom: 15px;
                            margin-top: 40px;
                            padding-left: 100px;
                            padding-bottom: 50px;
                        }
                        #loginButton {
                            padding-left: 100px;
                            padding-top: 50px;
                        }

                        footer {
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
            )
        }
    }

    render() {
        return (
            <div style={indexStyle}>
                <Head>
                    <title>Account - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                {this.getContent()}
            </div>
        );
    }
}

export default Account;