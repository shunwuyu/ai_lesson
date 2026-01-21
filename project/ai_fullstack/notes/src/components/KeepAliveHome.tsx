import { KeepAlive } from 'react-activation';
import Home from '@/pages/Home';

function KeepAliveHome() {
  return (
    <KeepAlive name="home" saveScrollPosition="screen">
      <Home />
    </KeepAlive>
  );
}

export default KeepAliveHome