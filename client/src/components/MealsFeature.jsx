import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function MealsFeature() {

    const [features, setFeatures] = useState([]);

     //Images public URL
     const PF = process.env.REACT_APP_PUBLIC_FOLDER; 

    useEffect(() => {
        const fetchFeature = async () => {
            try{
                const res = await axios.get("http://localhost:5500/posts/?cat=mealsFeature");
                setFeatures(res.data);
            } catch(err){
                console.log(err);
            }
        };
        fetchFeature();
    },[]);


    //use function below to get text with with html tags
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

  return (
    <div>
        {features.map((feature) => (
                <Link to={`/posts/${feature.id}`}>
                    <div className="mainPost" key={feature.id}>
                        <div className="text">
                            <h3>{feature.title}</h3>
                            <h1>{getText(feature.desc)}</h1>
                        </div>
                        <div className="image">
                            <img src={PF + feature.postImg}  alt="" />
                        </div>
                    </div>
                </Link> 
            ))}

    </div>
  )
}

export default MealsFeature