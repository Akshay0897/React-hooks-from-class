import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default function Loading({ text = 'Loading', speed = 300 }) {
  const [content, setcontent] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setcontent === text + '...'
        ? setcontent(text)
        : setcontent(content + '.');
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return <p style={styles.content}>{content}</p>;
}
