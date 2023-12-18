import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Videoplayer() {
  return (
    <Card style={{ width: '75%', margin: 'auto' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
        {/* Smaller Profile Picture */}
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }}
        />

        {/* Name beside the Profile Picture */}
        <div>
          <strong>John Doe</strong>
        </div>
      </Card.Body>

      {/* Larger Video Player */}
      <video width="100%" height="auto" controls>
        <source src="https://www.youtube.com/embed/hBF2_unTVWg" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Card Body */}
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>

      {/* Button at the Bottom-Right */}
      <Card.Footer style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="secondary">Another Button</Button>
      </Card.Footer>
    </Card>
  );
}

export default Videoplayer;
