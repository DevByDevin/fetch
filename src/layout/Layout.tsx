import React from 'react';
import { NavBar } from '../components/NavBar';
import styles from './layout.module.scss';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
};
