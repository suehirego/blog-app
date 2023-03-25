import React, { useContext, useState } from 'react';
import './write.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from '../context/authContext';


function Write() {

    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || ""); //if there is a state, use the post's title else go to new write page
    const [title, setTitle] = useState(state?.title || "");
    const [cat, setCat] = useState(state?.cat || "");
    const [link, setLink] = useState(state?.link || "");
    const [type, setType] = useState(state?.type || "");
    const [file, setFile] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        // either edit or write new post
        try {
            //if there is a state; we are in the update page
            state
                ? await axios.put(`http://localhost:5500/posts/${state.id}`, {
                    title,
                    desc: value,
                    postImg: file ? imgUrl : "",
                    cat,
                    // userId: currentUser.id,
                })
                //no state; we are in the write/publish page
                : await axios.post("http://localhost:5500/posts/", {
                    title,
                    desc: value,
                    postImg: imgUrl,
                    cat: cat,
                    link: link,
                    type: type,
                    userId: currentUser.id,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };


    return (
        <div className='add'>

            <h3 style={{ color: '#363636' }}>Create New Post</h3>

            <div className="content">

                <div className="addContent">
                    <input
                        type="text"
                        name="title"
                        placeholder='Title'
                        className='addInput'
                        onChange={(e) => setTitle(e.target.value)}
                        
                    />
                    
                    <div className="editorContainer">
                        <ReactQuill
                            theme="snow"
                            value={value}
                            className="editor"
                            onChange={setValue}
                            
                        />
                        
                    </div>
                </div>

                <div className="addMenu">

                    <div className="item">
                        <h2>Publish</h2>

                        <div className="formInput">
                            <label>Select Genral Post Category</label>
                            <select value={cat} onChange={(e) => setCat(e.target.value)}>
                                <option defaultValue value="Home">Home</option>
                                <option value="meals">Meals</option>
                                <option value="fitness">Fitness</option>
                                <option value="advert">Advert</option>
                                <option value="feature">Fitness Feature</option>
                                <option value="mealsFeature">Meals Feature</option>
                            </select>
                        </div>

                        <div className="formInput">
                            <label>Select Fitness Type</label>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option selected="selected" value="workouts">Workouts</option>
                                <option value="fitNews">New in Fitness</option>
                                <option value="receipes">Receipes</option>
                                <option value="mealNews">New in Meals</option>
                            </select>
                        </div>


                        <div className="menuLink">
                            <label>Enter Menu Image Link:</label>
                            <input
                                type="text"
                                placeholder='www.link.com'
                                className='addInput'
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>

                        <div className="publishWrapper">
                            <input
                                type="file"
                                id="file"
                                className="custom-file-input"
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            <div className="buttons">
                                <span className='publishBtn' onClick={handleClick}>Publish</span>
                                {error && <p>Something went wrong!</p>}
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Write

