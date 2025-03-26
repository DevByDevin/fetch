import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export const DogCard = ({ dog }: { dog: Dog }) => {
  const { img, name, age, zip_code, breed } = dog;
  return (
    <Card style={{ width: '16rem', height: '24rem' }}>
      <Card.Img variant="top" src={img} alt={`photo_${name}`} style={{ height: '14rem', objectFit: 'cover' }} loading="lazy" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{breed}</Card.Subtitle>
        <Card.Text style={{ display: 'flex', gap: '0.2rem', flexWrap: 'wrap' }}>
          <Badge bg="warning">{`${age} yrs`}</Badge>
          <Badge bg="danger">{zip_code}</Badge>
          <Badge bg="success">{breed}</Badge>
        </Card.Text>
        <Button variant="primary" size="sm">
          Learn more
        </Button>
      </Card.Body>
    </Card>
  );
};
