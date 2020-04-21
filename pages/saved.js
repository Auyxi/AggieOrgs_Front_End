import SideNavLayout from "../components/SideNavLayout";
import OrgDisplay from "../components/OrgDisplay/OrgDisplay";
import Head from 'next/head';
import Router from 'next/router'

var store = require('store');
var print = [{hello: "1"}, {hello: "1"}, {hello: "1"}];
// this is the intended behavior we want in our listOrgs()
print.forEach((elem) => {
    console.log(elem.hello);
});

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
            orgs: []
            
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
                    orgInfo.push(data);
                })
            })
            console.log(orgInfo);
            print = orgInfo;
        })
        .then(() => {
            this.setState({
                orgs : orgInfo,
                loading : false
            }, () => {
                console.log(this.state);
            })
        })
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
        var orgs = this.state.orgs;
        console.log("inside of listOrgs");
        console.log(orgs);
        var items = orgs.forEach((elem) => {
            elem.orgName;
        });
        console.log("print");
        for (var i = 0; i < print.length; i++) {
            console.log(print[i]);
        }
        console.log(items);
        return (
            <div>
                {items}
            </div>
        )
    }

    render() {
        var name = store.get('user').firstName;
        var display;

        if (this.state.loading) {
            display = this.loading();
        }
        else {
            console.log(this.state);
            display = this.listOrgs();
            //console.log(display);
        }

        return (
            <div style={indexStyle}>
                <Head>
                    <title>Saved - AggieOrgs</title>
                    <script src="https://apis.google.com/js/platform.js"></script>
                </Head>
                <SideNavLayout />
                <h1>{name}'s Saved Organizations</h1>

                {display}

                <OrgDisplay
                    orgName = "asd"
                    tags = "asd"
                    purpose =  "asd"
                />

                <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylyski for CSCE 482 @ TAMU</footer>
    
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

Saved.getInitialProps = (ctx) => {
    if (!store.get('user')) {
        store.set('user', {
            id: "",
            firstName: "",
            lastName: "",
            isSignedIn: false,
        })
    }

    return { loggedIn: store.get('user').isSignedIn}
}

export default Saved;