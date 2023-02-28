import React, { useState } from "react";
import axios from "axios";
import { redirect } from "react-router";
export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/users/register`, {
                username,
                password,
                email,
            })
            .then((res) => {
                console.log(res.data);
                // if successful, redirect to photos
                if (res.data.success) {
                    // redirect
                }
            })
            .catch((err) => {
                //dispatch error
                //console.log(err);
            });
    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
