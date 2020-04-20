import SideNavLayout from "../components/SideNavLayout";
import OrgDisplay from "../components/OrgDisplay/OrgDisplay";
import Head from 'next/head';

const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%",
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