import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FitnessFeature from '../components/FitnessFeature';



function Exercise() {

    const [posts, setPosts] = useState([]);

    //Images public URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5500/posts/?cat=fitness");
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPosts();
    }, []);


    return (
        <div className='exercise'>
            <div className="wrapper">

                <FitnessFeature />
                
                <div className="mealDetails">
                    <div className="heading">
                        <span>FITNESS</span>
                        <p>Workouts</p>
                    </div>
                    <hr />

                    <div className="details">
                        {posts.map((post) => (
                            <div className="image" key={post.id}>
                                <Link to={`/posts/${post.id}`} className='link'>
                                    <img src={PF + post.postImg} alt="" />
                                    <div className="descWrapper">
                                        <h4>{post.title}</h4>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="menuWrapper">
                <Menu />
            </div>
        </div>
    )
}

export default Exercise