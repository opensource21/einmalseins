import React from 'react';
import ReactDOM from 'react-dom';

import Trainer from './components/Trainer'


function Page() {
  return <div>
    <h1>1x1-Trainer</h1>
    <Trainer/>
  </div>
}

ReactDOM.render(<Page />, document.getElementById('mountPoint'));
