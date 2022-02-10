import * as React from 'react';
import { useLayer2 } from '../../dist';

function SomeComponent() {
  const { config } = useLayer2();

  const printConfig = () => console.log(config);

  return (
    <div>
      <p>some component here</p>
      <button onClick={printConfig}>print config</button>
    </div>
  );
}

export default SomeComponent;
