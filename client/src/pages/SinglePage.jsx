/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';
import Menu from '../components/Menu';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import moment from "moment";
import DOMPurify from "dompurify";

function SinglePage() {

    const [post, setPost] = useState({});

    //Images public URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    const { currentUser } = useContext(AuthContext);

    //get post
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5500/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId])

    //delete post
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5500/posts/${postId}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='single'>
            <div className="content">

                <img src={PF + post.postImg} alt="" />

                <div className="contentWrapper">
                    <div className="user">

                       
                        {post.img && <img src={PF + post.img} alt="" />}
                      

                        <div className="info">
                            {post.username && <span>{post.username}</span>}
                            <p>Posted {moment(post.date).fromNow()}</p>
                        </div>
                    </div>
                    {currentUser?.username === post.username && (
                        <div className="edit">
                            <Link  to={`/write?edit=2`} className='link' state={post}>
                                <MdModeEditOutline className='icon' style={{ backgroundColor: '#6BB77B' }} />
                            </Link>
                            <MdDeleteForever className='icon' style={{ backgroundColor: 'red' }} onClick={handleDelete} />
                        </div>
                    )}

                </div>

                <div className="contentDesc">
                    <h1>{post.title}</h1>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.desc),
                        }}
                        style={{ color: '#363636' }}
                    ></p>
                </div>

            </div>

            <div className="menuWrapper">
                <Menu/>
            </div>

        </div>
    )
}

export default SinglePage





