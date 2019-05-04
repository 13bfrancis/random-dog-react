import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DogImage = styled.img`
  grid-column: 2 / 4;
  width: 100%;
  border: 1px solid black;
`;

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const GetDogButton = styled.button`
  padding: 1rem;
  grid-column: 1 / -1;
`;

function App() {
  const [randomPicture, setRandomPicture] = useState('');
  const [loading, setLoading] = useState(false);

  const getNewDog = () => {
    setLoading(true);
    fetch('https://random.dog/woof.json')
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        if (resJson.url.search(/\.png/) === -1) {
          getNewDog();
        } else {
          setLoading(false);
          setRandomPicture(resJson.url);
        }
      });
    console.log('hello'.search('helo'));
  };
  return (
    <AppContainer>
      <GetDogButton onClick={getNewDog}>Get New Dog</GetDogButton>
      {loading ? (
        '...loading'
      ) : (
        <>
          {randomPicture ? (
            <DogImage src={randomPicture} alt="random dog" />
          ) : (
            <p>Click the button!!</p>
          )}
        </>
      )}
    </AppContainer>
  );
}

export default App;
