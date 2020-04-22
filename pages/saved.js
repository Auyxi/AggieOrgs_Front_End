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
                'Authorization': "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5ZDk3YjRjYWU5MGJjZDc2YWViMjAwMjZmNmI3NzBjYWMyMjE3ODMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODg1MTE2MTQ5MDY5LWwzZ2Y4czQ4dTVhc3FkMjd2c2VxYmg5a2Nobzl1cnNsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODg1MTE2MTQ5MDY5LWwzZ2Y4czQ4dTVhc3FkMjd2c2VxYmg5a2Nobzl1cnNsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDY1MDI0NjAyOTUzMzkxMzY3IiwiZW1haWwiOiJhbGV4LmQubi5waGFtQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiODJzcFRwTUN6QWRDRGpFU1BuNHctdyIsIm5hbWUiOiJBbGV4IFBoYW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1FZEJSbUMwTlFZZy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQUtXSkpPTWhaNklzeno1SU94TXZHMWw5N1RBYVNKX05nL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBbGV4IiwiZmFtaWx5X25hbWUiOiJQaGFtIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1ODc1MDcwODEsImV4cCI6MTU4NzUxMDY4MSwianRpIjoiYWJlOTA0MjY2MjExZWM5NmNmNTk0MGYwZTY0YjcyMGNmNTFjNWVlZSJ9.yCt2XzSi-TWZ6xu9YOlzxamyh273n4wyNGlnWHDbGieU9_Mg78g9CDyfECnFtmJgtK8CIwuywMZGsWaT6-42UN2xZCZJXDQpMTKTiYkw-O6Pw-5zqn7XECJyMVsXXExGEHZbWBUwTgzGbV-2N3ItdBj40_rUK2cQXmBi7vwMsUVVtJG4Q2geH5tT37yDQDOHILeOWBQp3AUQfVjlmYR29ZWcUYOBagcrNsxr0upLJ0wA7AtykVZw9372ox09NT7vJXL3BuEwxR3LMPSfeezwD8hK7ZXFTupEa2ycZicSyI_9Zb-kC9P8cXnjOEDXD_vEiU91EXVDAm3_orgLYlAvWQ"
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
                        'Authorization': "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5ZDk3YjRjYWU5MGJjZDc2YWViMjAwMjZmNmI3NzBjYWMyMjE3ODMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODg1MTE2MTQ5MDY5LWwzZ2Y4czQ4dTVhc3FkMjd2c2VxYmg5a2Nobzl1cnNsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODg1MTE2MTQ5MDY5LWwzZ2Y4czQ4dTVhc3FkMjd2c2VxYmg5a2Nobzl1cnNsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDY1MDI0NjAyOTUzMzkxMzY3IiwiZW1haWwiOiJhbGV4LmQubi5waGFtQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiODJzcFRwTUN6QWRDRGpFU1BuNHctdyIsIm5hbWUiOiJBbGV4IFBoYW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1FZEJSbUMwTlFZZy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQUtXSkpPTWhaNklzeno1SU94TXZHMWw5N1RBYVNKX05nL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBbGV4IiwiZmFtaWx5X25hbWUiOiJQaGFtIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1ODc1MDcwODEsImV4cCI6MTU4NzUxMDY4MSwianRpIjoiYWJlOTA0MjY2MjExZWM5NmNmNTk0MGYwZTY0YjcyMGNmNTFjNWVlZSJ9.yCt2XzSi-TWZ6xu9YOlzxamyh273n4wyNGlnWHDbGieU9_Mg78g9CDyfECnFtmJgtK8CIwuywMZGsWaT6-42UN2xZCZJXDQpMTKTiYkw-O6Pw-5zqn7XECJyMVsXXExGEHZbWBUwTgzGbV-2N3ItdBj40_rUK2cQXmBi7vwMsUVVtJG4Q2geH5tT37yDQDOHILeOWBQp3AUQfVjlmYR29ZWcUYOBagcrNsxr0upLJ0wA7AtykVZw9372ox09NT7vJXL3BuEwxR3LMPSfeezwD8hK7ZXFTupEa2ycZicSyI_9Zb-kC9P8cXnjOEDXD_vEiU91EXVDAm3_orgLYlAvWQ"
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
<<<<<<< HEAD
        var test = this.state.orgs;
        var display = test.map((elem) => <OrgDisplay orgName={elem.orgName} tags={elem.orgTags} purpose={elem.orgPurpose} />)
=======
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
>>>>>>> 2a61b436f95d77e1362afe50ce612bd099491373
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
                <h1>{name}'s Saved Organizations</h1>

                {display}

                <OrgDisplay
                    orgName = "asd"
                    tags = "asd"
                    purpose =  "asd"
                />

                <footer>Created by Emily Davis, Taige Li, Alex Pham, Ben McKenzie, and Cameron Przybylski for CSCE 482 @ TAMU</footer>
    
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

export default Saved;