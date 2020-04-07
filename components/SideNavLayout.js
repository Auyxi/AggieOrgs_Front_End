import SideNav from "../components/SideNav/SideNav";
import Backdrop from "../components/Backdrop/Backdrop"
import SideNavToggle from '../components/SideNav/SideNavToggle';

class SideNavLayout extends React.Component {
    state = {
        SideNavOpen: false
    };

    SideNavClickHandler = () => {
        this.setState((prevState) => {
            return {SideNavOpen: !prevState.SideNavOpen}
        });
    };

    SideNavCloseHandler = () => {
        this.setState({SideNavOpen: false});
    }

    render() {
        let sideNav;
        let backdrop;

        if (this.state.SideNavOpen) {
            backdrop = <Backdrop />
        }

        return (
            <div style={{height: '100%'}}>
                <SideNavToggle click={this.SideNavClickHandler}/>
                <SideNav click={this.SideNavCloseHandler} show={this.state.SideNavOpen}/>
                {backdrop}
            </div>
        );
    }
}

export default SideNavLayout;