import { useGetBreeds } from '../apis/useGetBreeds';
import { useGetDogs } from '../apis/useGetDogs';
import { useSearchDogs } from '../apis/useSearchDogs';
import { AppSpinner } from '../components/Spinner';
import { Dog, DogCard } from '../components/DogCard';
import { Col, Container, Row } from 'react-bootstrap';

export const Home = () => {
  const { data: breeds } = useGetBreeds();
  const { data: ids } = useSearchDogs();
  const dogIds = ids?.resultIds ?? [];
  const { data: dogs, isLoading: isDogsLoading } = useGetDogs(dogIds);

  if (isDogsLoading) return <AppSpinner />;
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4}>
        {dogs.map((dog: Dog, index: number) => (
          <Col key={index} className="mb-4">
            <DogCard dog={dog} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
