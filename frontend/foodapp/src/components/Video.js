import React, { useRef, useState, useEffect } from "react";
import "./Video.css";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";

export default function Video({ url, isCurrent }) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);

  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <div className={`video-cards ${isCurrent ? "visible" : ""}`}   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <video
        onClick={onVideoClick}
        className="video-player"
        ref={vidRef}
        src={url}
        loop
      />
    </div>
  );
}