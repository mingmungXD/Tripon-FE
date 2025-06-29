import React from 'react';

const styles = {
  footer: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    marginTop: 'auto'
  },
  text: {
    color: '#666',
    fontSize: '0.9rem'
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 Tripon. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
