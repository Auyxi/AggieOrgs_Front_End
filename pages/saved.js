import SideNavLayout from "../components/SideNavLayout";
import OrgDisplay from "../components/OrgDisplay/OrgDisplay";
import Head from 'next/head';

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%",
    'padding-top': "50px",
};

export default function Saved() {
    return (
        <div style={indexStyle}>
            <Head>
                <title>Saved - AggieOrgs</title>
                <script src="https://apis.google.com/js/platform.js"></script>
            </Head>
            <SideNavLayout />
            <h1>NAME's Saved Organizations</h1>

            <OrgDisplay 
            	orgName = "Dance Arts Society"
            	tags = "tag1, tag2, tag3, tag4"
            	date = "1/1/2020" 
            />
            <OrgDisplay 
            	orgName = "Dance Arts Society"
            	tags = "tag1, tag2, tag3, tag4"
            	date = "1/1/2020" 
            />

            <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Muli|Roboto&display=swap');
                    h1 {
                        font-family: 'Muli';
                        font-size: 48px;
                        margin-left: 100px;
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