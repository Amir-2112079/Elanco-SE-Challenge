import "../Css/NavBar.css";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div id="title"> Elanco Test</div>

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

function NavItem({ to, label }) {
    return (
        <li>
            <NavLink to={to} activeClassName='active'>
                {label}
            </NavLink>
        </li>
    );
}

export default NavBar;