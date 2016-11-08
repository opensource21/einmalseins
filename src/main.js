import React from 'react';
import ReactDOM from 'react-dom';

import Trainer from './components/Trainer';

function Page() {
    return <div>
      <h1 className="row col-md-12">1x1-Trainer</h1>
      <Trainer/>
    </div>;
}

ReactDOM.render(<Page />, document.getElementById('mountPoint'));
