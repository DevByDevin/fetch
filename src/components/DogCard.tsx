import React, { useContext } from 'react';
import { Badge, Button, Card, Placeholder } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { MatchContext } from '../context/MatchContext';
import { AppContext } from '../context/AppContext';

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export const DogCard = ({ dog, withLike = true }: { dog: Dog; withLike?: boolean }) => {
  const { id, img, name, age, zip_code, breed } = dog;
  const { matchDogs, setMatchDogs } = useContext(MatchContext);
  const { zipMap } = useContext(AppContext);
  const { city, county, state } = zipMap[zip_code] ?? { city: null, county: null, state: null };
  const liked = matchDogs.includes(id);

  const handleLike = () => {
    if (!liked) setMatchDogs(prev => [...prev, id]);
    else setMatchDogs(prev => prev.filter(item => item !== id));
  };

  return (
    <Card style={{ width: '16rem', height: '28rem' }}>
      <Card.Img variant="top" src={img} alt={`photo_${name}`} style={{ height: '14rem', objectFit: 'cover' }} loading="lazy" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{breed}</Card.Subtitle>
        <Card.Text style={{ display: 'flex', gap: '0.2rem', flexWrap: 'wrap' }}>
          <Badge bg="warning">{`${age} yrs`}</Badge>
          <Badge bg="success">{zip_code}</Badge>
        </Card.Text>
        <Card.Text as={'p'} style={{ fontSize: '0.8rem' }}>
          {city && county && state ? `Location: ${city}, ${state}, ${county}` : <Placeholder />}
        </Card.Text>
        {withLike && (
          <Button variant="outline-light" size="sm" style={{ color: 'red', borderColor: 'red' }} onClick={handleLike}>
            {liked ? <HeartFill style={{ marginRight: '5px' }} /> : <Heart style={{ marginRight: '5px' }} />}
            Like
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
