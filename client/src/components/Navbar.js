import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="navbar-container">
            <Navbar.Brand as={Link} to="/" className="navbar-logo">
                4Rent
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/search" className="navbar-link">
                        Search Timeshare
                    </Nav.Link>
                    <Nav.Link as={Link} to="/guides" className="navbar-link">
                        Guides
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact" className="navbar-link">
                        Contact
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about" className="navbar-link">
                        About Us
                    </Nav.Link>
                    {/* User Icon with Dropdown Menu */}
                    <NavDropdown
                        title={<i className="user icon navbar-user-icon"></i>}
                        id="basic-nav-dropdown"
                        alignRight
                        className="navbar-user-dropdown"
                    >
                        <NavDropdown.Item as={Link} to="/signin" className="dropdown-item">
                            Login
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/signup" className="dropdown-item">
                            Register
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
