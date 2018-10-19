import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default () => {
  return (
    <header className="c-header">
      <nav className="c-header__nav">
        <div className="c-header__title">
          <span role="img" aria-label="Today">
            
          </span>
          <span role="img" aria-label="I">
            
          </span>
          <span role="img" aria-label="learned">
            
          </span>{' '}
          BioTrack | <span aria-hidden="true">Companies and Products </span>
        </div>
        
      </nav>
    </header>
  );
};
