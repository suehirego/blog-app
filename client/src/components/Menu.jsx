import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBookmark } from 'react-icons/fa';

function Menu() {

    const [posts, setPosts] = useState([]);

    //Images public URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const res = await axios.get("http://localhost:5500/posts/?cat=advert");
                setPosts(res.data);
            } catch(err){
                // console.log(err);
            }
        };
        fetchPosts();
    },[])

    //use function below to get text with with html tags
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }



    return (
        <div className='menu'>

            <div className="menuHeading">
                <FaBookmark style={{color: '#FBFDFC'}}/>
                <h3>MORE GOOD READS:</h3>
            </div>

            {posts.map((post) => (
                <a href={post.link} target="blank" >
                    <div className="menuPost" key={post.id}>
                        <img src={PF+post.postImg} alt="" />
                        <h4>{getText(post.desc)}</h4>
                        <hr/>
                    </div>
                </a>


            ))}
        </div>
    )
}

export default Menu