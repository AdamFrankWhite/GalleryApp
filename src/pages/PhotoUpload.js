import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PhotoUpload.css";
import { connect } from "react-redux";
function PhotoUpload(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let formData = new FormData();
    //     formData.append("title", title);
    //     formData.append("description", description);
    //     formData.append("file", file);

    //     axios
    //         .post(`http://localhost:5000/api/photos`, {
    //             formData,
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             //dispatch error
    //             console.log(err);
    //         });
    // };

    // const handleImageChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    useEffect(() => {
        setUsername(props.user.username);
        console.log(username);
    }, [props.user]);
    return (
        <div>
            <h1>Upload Photos</h1>

            {/* <form onSubmit={handleSubmit}>
                <div className="row">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Upload</button>
            </form> */}
            <form
                action="http://localhost:5000/api/photos"
                encType="multipart/form-data"
                method="post"
            >
                <input type="hidden" name="username" value={username} />
                <div className="row">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Image</label>
                    {/* add MULTIPLE */}
                    <input type="file" e name="image" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

const mapStateToProps = function(state) {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(PhotoUpload);
