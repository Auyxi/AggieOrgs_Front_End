import SideNavLayout from "../components/SideNavLayout";

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

export default function Account() {
    return (
        <div style={indexStyle}>
            <SideNavLayout />
            <h1>Welcome to AggieOrgs, NAME.</h1>
            <p>Placeholder for account view.</p>
        </div>
    );
}