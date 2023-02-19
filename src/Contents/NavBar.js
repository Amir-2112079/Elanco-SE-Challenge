import "../Css/NavBar.css";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div id="title"> Elanco SE Challenge</div>

            <div>
                <ul id='navbar' >
                    <NavItem to='/Applications' label='Applications' />
                    <NavItem to='/Resources' label='Resources' />
                    <NavItem to='/Raw' label='Raw' />

                </ul>
            </div>


        </nav>
    )
}
//NavItem that takes two props
//to specifies the link it should go to and label specifies the text it should display
function NavItem({ to, label }) {
    return (
        <li>
            <NavLink to={to}>
                {label}
            </NavLink>
        </li>
    );
}

export default NavBar;