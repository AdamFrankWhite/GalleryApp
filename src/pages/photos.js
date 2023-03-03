import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Photos.module.css";
import { connect } from "react-redux";
// import ProgressiveImage from "react-progressive-graceful-image";
import { Rings } from "react-loader-spinner";
function photos(props) {
    let initialStyles = {
        previewGalleryGrid: {
            width: "100%",
            padding: "10%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "2%",
        },
        tile: {
            width: "275px",
            height: "200px",
            objectFit: "cover",
        },
        image: {
            width: "100%",
            height: "100%",
        },
    };
    const [photos, setPhotos] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [userStyles, setUserStyles] = useState(initialStyles);
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

    useEffect(() => {
        console.log(selectedPhotos);
    }, [props.user.username]);

    const addSelectedPhoto = (photo) => {
        // check if array already contains photo
        if (!selectedPhotos.some((arrayPhoto) => arrayPhoto.id == photo.id)) {
            setSelectedPhotos([...selectedPhotos, photo]);
        } else {
            setSelectedPhotos(
                selectedPhotos.filter((arrayPhoto) => arrayPhoto.id != photo.id)
            );
        }
        console.log(selectedPhotos);
    };
    const getPhotos = (username) => {
        axios
            .post("http://localhost:5000/users/photos", {
                username,
            })
            .then((res) => {
                // return photos
                setPhotos(res.data.photos);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleGalleryEdit = (style) => {
        setUserStyles((prevState) => ({
            ...prevState,
            [style.attr]: {
                ...prevState[style.attr],
                [style.property]: style.value,
            },
        }));
        console.log(userStyles);
    };

    const repeatString = (str, i) => {
        return str.repeat(i);
    };
    return (
        <div>
            <h1>MyPhotos</h1>

            <div className={styles.photoGrid}>
                {photos.map((photo) => {
                    return (
                        <div
                            className={styles.photoTile}
                            key={photo.id}
                            onClick={() => {
                                addSelectedPhoto(photo);
                            }}
                        >
                            {/* <ProgressiveImage
                                src={photo.url}
                                placeholder={`$photo.placeholderUrl{ph}`}
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
                                    className={
                                        selectedPhotos.some(
                                            (arrayPhoto) =>
                                                arrayPhoto.id == photo.id
                                        )
                                            ? styles.selectedPhoto + " image"
                                            : "image"
                                    }
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
            <h2>Gallery options</h2>
            <label>Image width</label>
            <input
                type="range"
                min="0"
                max="500"
                value={userStyles.tile.width}
                onChange={(e) =>
                    handleGalleryEdit({
                        attr: "tile",
                        property: "width",
                        value: e.target.value + "px",
                    })
                }
            />

            <label>Image per row</label>
            <input
                type="range"
                min="0"
                value={userStyles.previewGalleryGrid.gridTemplateColumns}
                max={selectedPhotos.length}
                onChange={(e) =>
                    handleGalleryEdit({
                        attr: "previewGalleryGrid",
                        property: "gridTemplateColumns",
                        value: repeatString("1fr ", e.target.value),
                    })
                }
            />

            <h2>Gallery Preview</h2>
            <div style={userStyles.previewGalleryGrid}>
                {selectedPhotos.map((photo) => {
                    return (
                        <div
                            style={userStyles.tile}
                            key={photo.id + "-preview"}
                        >
                            <img
                                style={userStyles.image}
                                src={photo.url}
                                alt=""
                            />

                            {/* <h2>{photo.title}</h2>
                            <h3>{photo.description}</h3> */}
                        </div>
                    );
                })}
            </div>

            <h2>Code</h2>
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
