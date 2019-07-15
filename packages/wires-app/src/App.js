import React from 'react';
import { Provider } from 'react-redux';

import './app.css'
import createStore from './store/createStore';

const store = createStore({
  dep: 'dep'
});

function App() {
  return (
    <Provider store={store}>
      <div>
        Hi there!
      </div>
    </Provider>
  );
}

export default App;
