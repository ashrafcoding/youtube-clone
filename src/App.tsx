import React from 'react';
import {Container} from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header/>
      <Container  className='app_container'>
        <Sidebar/>
      </Container>
    </div>
  );
}

export default App;
