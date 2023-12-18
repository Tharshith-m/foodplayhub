import React, { useState, useEffect } from 'react';
import { Usercontext } from './Login';
import { purchasestore } from '../App';
import Video from './Video';


const VideoDisplayComponent = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  

    useEffect(() => {
        const backendUrl = 'http://localhost:5000/main';

        fetch(backendUrl)
            .then(response => response.json())
            .then(data => {
                setUsers(data.videousers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const handleVideoEnd = () => {
        // Play the next video when the current video ends
        setCurrentVideoIndex(prevIndex => (prevIndex + 1) % users.length);
    };
    // goooooooooooooooo toooooooooooo prooooofile page 

    return (
        <div  className='bpp'>
            <h1>Video Display</h1>

            {/* <ul> */}
                {/* {users.map((video,index) => (
                    <li key={video._id}  style={{ display: index === currentVideoIndex ? 'block' : 'none' }}>
                        <video width="640" height="360" controls >
                            <source src={video.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <button>
                            Purchase
                        </button>
                        <br />
                    </li>
                ))} */}
            {/* </ul> */}
            <div className="video-container" id="video-container">
          {/*  */}

          {users.map((video,index) => (
            <Video
              key={video._id}
            //   channel={list.channel}
            //   song={list.song}
              url={video.video}
            //   likes={list.likes}
            //   comment={list.comment}
            //   shares={list.shares}
            />
          ))}

          {/*  */}
        </div>

        </div>
    );
}

function Main() {
    return (
        <div>
            <h1>Main website</h1>
            <VideoDisplayComponent />
        </div>
    );
}

export default Main;
