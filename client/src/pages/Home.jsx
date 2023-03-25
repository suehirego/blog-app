/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import video1 from '../assets/video1.mp4';
import Menu from '../components/Menu';



function Home() {

    const [posts, setPosts] = useState([]);

    //Images public URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5500/posts/?cat=home");
                setPosts(res.data);
            } catch (err) {
                // console.log(err);
            }
        };
        fetchPosts();
    }, []);

    //use function below to get text with with html tags
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }


    return (
        <div className='home'>
            <div className='posts'>

                {posts.map((post) => (

                    <div className="mainPost" key={post.id}>
                        <Link to={`/posts/${post.id}`} className='link'>
                            <div className="postWrapper">
                                <div className="text">
                                    <h3>{post.title}</h3>
                                    <p>{getText(post.desc)}</p>
                                </div>
                                <div className="image">
                                    <img src={PF + post.postImg} alt="" />
                                </div>
                            </div>
                        </Link>

                        <div className="space">
                            <hr />
                        </div>

                    </div>

                ))}

                <div className="post" >
                    <div className="image">
                        <video className='videoTag' autoPlay loop muted>
                            <source src={video1} type='video/mp4' />
                        </video>
                    </div>
                    <div className="content">
                        <h3 style={{ wordBreak: 'normal !important' }}>Personalised Fitness</h3>
                        <p>You work directly with our fitness and nutrition coaches who will create a
                            personalized plan that will work for you.  Yes, you get 2 coaches.
                            Experience weekly check-ins and life-changing results, all at a price you can afford.
                        </p>
                    </div>
                </div>

            </div>

            <div className="menuWrapper">
                <Menu />
            </div>

        </div>
    )
}

export default Home