import React, { useContext, useState } from 'react';
import { Badge, Button, Modal, Offcanvas } from 'react-bootstrap';
import { GiJumpingDog, GiSittingDog } from 'react-icons/gi';
import styles from './match.module.scss';
import { MatchContext } from '../context/MatchContext';
import { useGetMatchDog, useGetMatchDogs } from '../apis/useGetDogs';
import { useGetMatch } from '../apis/useMatch';
import { Dog, DogCard } from './DogCard';
import { MatchDogCard } from './MatchDogCard';
import { AppSpinner } from './Spinner';
import { useWindowSize } from 'react-use';
import ReactConfetti from 'react-confetti';

export const Match = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { matchDogs } = useContext(MatchContext);
  const numOfLiked = matchDogs.length ?? 0;
  const { data: likedDogs } = useGetMatchDogs(matchDogs);
  const { data: theMatchId, isLoading: isGettingTheMatchId, refetch: refetchTheMatchId } = useGetMatch(matchDogs);
  const { data: theMatch, isLoading: isGettingTheMatch, refetch: refetchTheMatch } = useGetMatchDog([theMatchId?.match]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleMatch = () => {
    refetchTheMatchId();
    refetchTheMatch();
    handleShowModal();
    handleClose();
  };

  return (
    <div className={styles.matchContainer}>
      <Button variant="success" onClick={handleShow} className="me-2">
        <div className={styles.matchPill}>
          <div>
            <GiJumpingDog /> Puppies you Liked!
          </div>
          <div>
            <Badge pill bg="info">
              {numOfLiked}
            </Badge>
          </div>
        </div>
        <div className={styles.helper}>Click to see the one for you~</div>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>See who is the one for you!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {numOfLiked ? (
            <>
              {likedDogs?.map((likedDog: Dog) => (
                <MatchDogCard dog={likedDog} />
              ))}
              <Button onClick={handleMatch}>
                <div>
                  <GiSittingDog />
                </div>
                <div>Let's see who is waiting for you!</div>
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>
              Haven't see puppies you liked? <br />
              Go find some first!
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>✨Here is the one!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isGettingTheMatch || isGettingTheMatchId ? <AppSpinner /> : <DogCard dog={theMatch[0]} withLike={false} />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      {showModal && <ReactConfetti gravity={0.4} />}
    </div>
  );
};
