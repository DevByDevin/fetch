import React, { useContext } from 'react';
import { Badge, Image } from 'react-bootstrap';
import { Dog } from './DogCard';
import styles from './matchDogCard.module.scss';
import { XCircle } from 'react-bootstrap-icons';
import { MatchContext } from '../context/MatchContext';

export const MatchDogCard = ({ dog }: { dog: Dog }) => {
  const { id, img, name, age, zip_code, breed } = dog;
  const { setMatchDogs } = useContext(MatchContext);

  const handleDislike = () => {
    setMatchDogs(prev => prev.filter(item => item !== id));
  };

  return (
    <div className={styles.matchDogItem}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={img} />
      </div>
      <div className={styles.infos}>
        <div className={styles.name}>{name}</div>
        <div className={styles.badges}>
          <Badge bg="warning">{`${age} yrs`}</Badge>
          <Badge bg="danger">{zip_code}</Badge>
          <Badge bg="success">{breed}</Badge>
        </div>
      </div>
      <div className={styles.closeBtnContainer} onClick={handleDislike}>
        <XCircle className={styles.closeBtn} />
      </div>
    </div>
  );
};
