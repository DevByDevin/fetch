import React, { useContext } from 'react';
import { Button, Container, FormSelect } from 'react-bootstrap';
import { useGetBreeds } from '../apis/useGetBreeds';
import { FilterContext } from '../context/FilterContext';
import styles from './filters.module.scss';
import { useSearchDogs } from '../apis/useSearchDogs';
import { MultiSelect } from 'react-multi-select-component';
import { PaginationContext } from '../context/PaginationContext';

export const Filters = () => {
  const { data: breeds = [], isLoading } = useGetBreeds();
  const { checkedBreeds, setCheckedBreeds, sort, setSort, sortBy, setSortBy } = useContext(FilterContext);
  const { setPage } = useContext(PaginationContext);

  const options = breeds.map((breed: string) => ({ label: breed, value: breed }));

  const { refetch } = useSearchDogs(checkedBreeds, sort, sortBy);

  const customValueRenderer = (selected: { label: any }[], _options: any) => {
    return selected.length ? selected.map(({ label }) => '✔️ ' + label) : '😶 No Breeds Selected';
  };

  return (
    <Container className={styles.filterContainer}>
      <div className={styles.breedSelectContainer}>
        <MultiSelect
          className={styles.breedSelect}
          options={options}
          value={checkedBreeds}
          onChange={setCheckedBreeds}
          labelledBy={'Select'}
          valueRenderer={customValueRenderer}
          overrideStrings={{ search: 'Search breeds' }}
          hasSelectAll={false}
        />
        <FormSelect className={styles.sortSelect} onChange={e => setSortBy(e.target.value)}>
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </FormSelect>
        <FormSelect className={styles.sortSelect} onChange={e => setSort(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </FormSelect>
        <Button
          className={styles.applyButton}
          size="sm"
          onClick={() => {
            setPage(1);
            refetch();
          }}
          disabled={isLoading}>
          Apply
        </Button>
      </div>
    </Container>
  );
};
