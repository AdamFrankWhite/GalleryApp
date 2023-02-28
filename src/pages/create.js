import React from "react";
import "./CreateGallery.css";
export default function create() {
    return (
        <div>
            <h1>Create Gallery</h1>
            <ul className="list">
                <li>select template</li>
                <li>select design</li>
                <li>select/upload images</li>
                <li>
                    // uploadFiles, create db entry, create export code,
                    abstract away as much as possible
                </li>
                <li>create export code - have html and ajax option</li>
            </ul>
        </div>
    );
}
