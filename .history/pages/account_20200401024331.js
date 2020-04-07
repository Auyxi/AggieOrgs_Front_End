import SideNavLayout from "../components/SideNavLayout";
import Head from 'next/head';
import React from 'react';

// https://www.intricatecloud.io/2019/08/adding-google-sign-in-to-your-webapp-a-react-example/

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
        }
    }

    componentDidMount() {
        const successCallback = this.onSuccess.bind(this);

        window.gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '885116149069-l3gf8s48u5asqd27vseqbh9kcho9ursl.apps.googleusercontent.com',
            })
        
            window.gapi.load('signin2', function() {
                // render a sign in button
                // using this method will show Signed In if the user is already signed in
                gapi.signin2.render('loginButton', {
                    width: 200,
                    height: 50,
                    onsuccess: successCallback,
                });
            })
        })
    }

    onSuccess() {
        this.setState({
            isSignedIn: true
        });
    }

    signOut() {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            this.setState({
                isSignedIn: false
            });

            console.log('User signed out.');
        });
    }

    getContent() {
        const signOut = this.signOut.bind(this);
        const profile = auth2.currentUser.get().getBasicProfile();

        if (this.state.isSignedIn) {
            return (
                <div>
                    <p>ID: {profile.getId()}</p>
                    <p>Given Name: {profile.getGivenName()}</p>
                    <p>Family Name: {profile.getFamilyName()}</p>
                    <button onClick={this.signOut}>Sign out of Google</button>
                </div>
            )
        } 
        else {
            return (
                <div>
                    <p>You are not signed in. Click here to sign in.</p>
                    <button id="loginButton">Login with Google</button>
                </div>
            )
        }
    }

    render() { 
        return (
            <div style={indexStyle}>
                <Head>
                    <title>Account - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
                </Head>
                <SideNavLayout />
                <h1>Welcome to AggieOrgs, NAME.</h1>
                {this.getContent()}
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

export default Account;