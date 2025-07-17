import { getProtected } from '../api';
import { useEffect } from 'react';

function Pay() {
  useEffect(() => {
    getProtected().then(console.log).catch(console.error);
  }, []);

  return <h2>Pay Page - Protected</h2>;
}

export default Pay;