import React, { useEffect, useState } from "react";
import axios from "axios";
import loadingIcon from "./loading.gif"
import "./AboutUs.css"

const AboutUs = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [error,setError] = useState("");

    useEffect(() => {
        const fetchAbout = async () => {
            try{
                const response = await axios.get("http://localhost:5002/api/about");
                const data = response.data;
                setName(data.name);
                setBio(data.bio);
                setImageUrl(data.imageUrl);
                setLoaded(true);
            }
            catch (err){
                console.error("Error fetching About info:", err);
                setError("Failed to load About page. Please try again later.");
            }
        };
        fetchAbout();
    },[]);
     return (
    <div className="about-container">
      <h1>About Me</h1>

      {error && <p className="about-error">{error}</p>}
      {!loaded && !error && <img src={loadingIcon} alt="loading" className="about-loading" />}

      {loaded && !error && (
        <article className="about-article">
          <img src={imageUrl} alt={name} className="about-photo" />
          <h2>{name}</h2>
          <p className="about-bio">{bio}</p>
        </article>
      )}
    </div>
  );
};

export default AboutUs;