import { Dog, DogCard } from '../components/DogCard';
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Filters } from '../components/Filters';
import { FilterContext } from '../context/FilterContext';
import { useGetDogs } from '../apis/useGetDogs';
import { useSearchDogs } from '../apis/useSearchDogs';
import { AppSpinner } from '../components/Spinner';
import { PaginationContext } from '../context/PaginationContext';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { checkedBreeds, sort, sortBy } = useContext(FilterContext);
  const { page } = useContext(PaginationContext);

  const { data: searchData } = useSearchDogs(checkedBreeds, sort, sortBy, page);
  const dogIds = searchData?.resultIds ?? [];
  const totalDataLen = searchData?.total ?? 0;
  const { data: dogs = [], isLoading: isDogsLoading } = useGetDogs(dogIds);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (isDogsLoading) return <AppSpinner />;

  return (
    <Container className="d-flex flex-column align-items-center">
      <Form onSubmit={handleSearch} className="d-flex gap-2 h-30 w-50 mt-4 mb-4">
        <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      <Filters />
      <Row xs={1} sm={2} md={3} lg={5}>
        {dogs?.map((dog: Dog, index: number) => (
          <Col key={index} className="mb-4">
            <DogCard dog={dog} />
          </Col>
        ))}
      </Row>
      <Pagination total={totalDataLen} />
    </Container>
  );
};
