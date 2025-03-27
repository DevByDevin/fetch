import { Dog, DogCard } from '../components/DogCard';
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Filters } from '../components/Filters';
import { FilterContext } from '../context/FilterContext';
import { useGetDogs } from '../apis/useGetDogs';
import { useSearchDogs } from '../apis/useSearchDogs';
import { AppSpinner } from '../components/Spinner';
import { PaginationContext } from '../context/PaginationContext';
import { Pagination } from '../components/Pagination';
import { Match } from '../components/Match';
import { useGetLocations } from '../apis/useLocations';
import { AppContext } from '../context/AppContext';
import { createZipMap } from '../utils/createZipMap';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { setZipMap } = useContext(AppContext);
  const { checkedBreeds, sort, sortBy } = useContext(FilterContext);
  const { page } = useContext(PaginationContext);

  const { data: searchData } = useSearchDogs(checkedBreeds, sort, sortBy, page);
  const dogIds = searchData?.resultIds ?? [];

  const { data: dogs = [], isLoading: isDogsLoading } = useGetDogs(dogIds);
  const locIds = dogs.map((dog: Dog) => dog.zip_code);
  const { data: locations, isLoading: isGettingLocations } = useGetLocations(locIds);
  const newZipMap = useMemo(() => createZipMap(locations), [locations]);

  useEffect(() => {
    if (newZipMap) {
      setZipMap(prev => ({ ...prev, ...newZipMap }));
    }
  }, [newZipMap, setZipMap]);

  const totalDataLen = searchData?.total ?? 0;

  if (isDogsLoading) return <AppSpinner />;

  return (
    <Container className="d-flex flex-column align-items-center">
      <Match />
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
