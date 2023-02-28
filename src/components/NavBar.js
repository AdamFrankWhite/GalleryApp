import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import styles from "../styles/NavBar.module.css";
// import { NavLink } from "react-router-dom";
import Link from "next/Link";
import { connect } from "react-redux";
import { logout } from "../redux/actions/userActions";
function NavBar(props) {
    // const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    useEffect(() => {
        setUsername(props.user.username);
    }, [props.user.username]);
    return (
        <nav className={styles.nav}>
            <Link href="/">PhotoApp</Link>
            <ul className={styles.navLinks}>
                <li>
                    {username == null ? (
                        <Link
                            href="/login"
                            // style={({ isActive }) =>
                            //     isActive ? activeStyle : undefined
                            // }
                        >
                            Login
                        </Link>
                    ) : (
                        <span
                            onClick={() => {
                                props.logout();
                                // navigate("/login");
                            }}
                            // style={({ isActive }) =>
                            //     isActive ? activeStyle : undefined
                            // }
                        >
                            Logout
                        </span>
                    )}
                </li>
                <li>
                    <Link
                        href="/create"
                        // className={
                        //     isActive ? activeClassName : undefined
                        // }
                    >
                        Create
                    </Link>
                </li>
                <li>
                    <Link
                        href="/register"
                        // className={({ isActive }) =>
                        //     isActive ? activeClassName : undefined
                        // }
                    >
                        Register
                    </Link>
                </li>
                <li>
                    <Link
                        href="/photos"
                        // className={
                        //     isActive ? activeClassName : undefined
                        // }
                    >
                        Photos
                    </Link>
                </li>
                <li>
                    <Link
                        href="/upload"
                        // className={
                        //     isActive ? activeClassName : undefined
                        // }
                    >
                        Upload
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
const mapStateToProps = function (state) {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    logout,
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);
