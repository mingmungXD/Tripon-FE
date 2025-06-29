import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    padding: '0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: '60px',
    display: 'flex',
    alignItems: 'center'
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    height: '100%'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  logoImage: {
    height: '100%',
    width: 'auto',
    objectFit: 'contain'
  }
};

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          <img src="/asset/icon_width.png" alt="TRIPON" style={styles.logoImage} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
