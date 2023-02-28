import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Photos.module.css";
import { connect } from "react-redux";
// import ProgressiveImage from "react-progressive-graceful-image";
import { Rings } from "react-loader-spinner";
function photos(props) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        // listen for change to user
        //reset photos
        setPhotos([]);
        getPhotos(props.user.username);
        console.log(window.localStorage.access_token);
    }, [props.user.username]);

    useEffect(() => {
        if (photos.length == 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [photos]);
    useEffect(() => {
        // TODO verifyLogin token
        if (props.user.username != null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [props.user.username]);

    const getPhotos = (username) => {
        console.log(username);
        axios
            .post("http://localhost:5000/users/photos", {
                username,
            })
            .then((res) => {
                console.log(res.data.photos);
                // return photos
                setPhotos(res.data.photos);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <h1>MyPhotos</h1>

            <div className={styles.photoGrid}>
                {photos.map((photo) => {
                    return (
                        <div className={styles.photoTile}>
                            {/* <ProgressiveImage
                                src={photo.url}
                                placeholder={photo.placeholderUrl}
                            >
                                {(src, loading) => (
                                    <img
                                        className={`image${
                                            loading ? " loading" : " loaded"
                                        }`}
                                        src={src}
                                        alt=""
                                        width="275px"
                                        height="auto"
                                    />

                                )}
                            </ProgressiveImage> */}
                            {loading ? (
                                <Rings
                                    height="80"
                                    width="80"
                                    color="#4fa94d"
                                    radius="6"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="rings-loading"
                                />
                            ) : (
                                <img
                                    className="image"
                                    src={photo.url}
                                    alt=""
                                    width="275px"
                                    height="auto"
                                />
                            )}

                            <h2>{photo.title}</h2>
                            <h3>{photo.description}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
const mapStateToProps = function (state) {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(photos);
