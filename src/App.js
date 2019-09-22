import React from 'react';
import {
  Container,
  Header,
  Segment,
} from 'semantic-ui-react';

import Convert from './components/convert';


import './App.css';

const style = {
  h1: {
    marginTop: '3em',
  },
}

function App() {
  return (
    <Container>
      <Segment.Group>
      <Header as='h1' textAlign='center' style={style.h1} content='Currency converter' />
        <Segment textAlign='center'><Convert/></Segment>
      </Segment.Group>
    </Container>
  );
}

export default App;
