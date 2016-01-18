import React from 'react';
import { render } from 'react-dom';
import router from './router';

router.run((Handler, state) => {
  render(<Handler {...state} />, document.getElementById('app'));
});
