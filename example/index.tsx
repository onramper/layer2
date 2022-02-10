import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { L2Provider } from '../.';
import SomeComponent from './components/SomeComponent';

const App = () => {
  return (
    <div>
      <L2Provider>
        <SomeComponent />
      </L2Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
