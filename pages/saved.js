import SideNavLayout from "../components/SideNavLayout";
import OrgDisplay from "../components/OrgDisplay/OrgDisplay";
import Head from 'next/head';
import Router from 'next/router'

var store = require('store');
var test = [];

if (!store.get('user')) {
    store.set('user', {
        id: "",
        firstName: "",
        lastName: "",
        isSignedIn: false,
    })
}

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%",
};

class Saved extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            
            loading: true,
            orgs: [],
            render: false
        };

        this.listOrgs = this.listOrgs.bind(this);
    }

    componentDidMount() {
        this.setState({
            token: store.get('user').id
        });

        if (!store.get('user').isSignedIn) {
            Router.replace("/account");
        }

        var saved;
        var orgInfo = [];

        fetch("https://api.aggieorgs.com/api/v1/account", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.get('user').id
            }
        })
        .then((response) => response.json())
        .then((data) => {
            saved = data.userInterestOrgsId;
        })
        .then(() => {
            saved.forEach((element) => {
                var orgAPI = "https://api.aggieorgs.com/api/v1/organization/" + element;
                fetch(orgAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': store.get('user').id
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.orgName);
                    orgInfo[orgInfo.length] = data;
                })
            })
        })
        .then(() => {
            this.setState({
                orgs : orgInfo,
                loading : false
            }, () => {
                console.log(this.state);
            })
        })

        setTimeout(function() {
            this.setState({
                render: true
            });
        }.bind(this), 3000);
    }

    componentDidUpdate() {
        const {pathname} = Router;
        if (pathname == '/saved' && !store.get('id')) {
            Router.replace('/account');
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

    listOrgs() {
        var test = this.state.orgs;
        var display = test.map((elem) => <OrgDisplay orgName={elem.orgName} tags={elem.orgTags} purpose={elem.orgPurpose} />)
        return (
            <div>
                {display}
            </div>
        )
    }

    render() {
        var name = store.get('user').firstName;
        var display;

        if (!this.state.render) {
            display = this.loading();
        }
        else {
            console.log(this.state);
            display = this.listOrgs();
        }

        return (
            <div style={indexStyle}>
                <Head>
                    <title>Saved - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                <div className = "pageContainer">
                    <div className = "pageContent">
                        <h1>{name}'s Saved Organizations</h1>

                        {display}
                    </div>
                    <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylski for CSCE 482 @ TAMU</footer>
                </div>
                <style jsx>{`
                        @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                        h1 {
                            font-family: 'Muli';
                            font-size: 48px;
                            margin-left: 100px;
                            padding-top: 50px;
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
                        .pageContainer {
                            position: relative;
                            min-height: 100vh;
                        }

                        .pageContent {
                            padding-bottom: 2.5rem;
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
                            height: 2.5rem;
                        }
                        
    
                    `}</style> 
            </div>
        );
    }
}

export default Saved;