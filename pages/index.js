import React from 'react';

import Layout from "../components/Layout";
import SideNavLayout from "../components/SideNavLayout";

// probably should move this to global css sheet
// https://nextjs.org/docs/basic-features/built-in-css-support
const indexStyle = {
    "border-top": "20px solid #500000",
    width: "100%",
    'padding-top': "80px",
};

class Index extends React.Component {
    render() {
        return (
            <div style={indexStyle}>
                <SideNavLayout />
                <p>Dummy Index/Home page for AggieOrgs.</p>
            </div>
        );
    }
}

export default Index;