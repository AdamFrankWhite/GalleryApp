import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
function login(props) {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        props.loginUser({ username, password });
    };

    useEffect(() => {
        if (props.user.username != null) {
            router.push("/photos");
        }
    }, [props.user.username]);
    return (
        <div className={styles.loginCont}>
            <h1 className={styles.loginHeading}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(login);
