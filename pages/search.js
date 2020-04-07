import SideNavLayout from "../components/SideNavLayout";

const indexStyle = {
    "border-top": "20px solid maroon",
    width: "100%"
};

export default function Search() {
    return (
        <div style={indexStyle}>
            <SideNavLayout />
            <h1>All Organizations</h1>
            <p>Placeholder for search system.</p>
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