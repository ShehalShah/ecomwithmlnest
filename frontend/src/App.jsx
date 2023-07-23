import React from 'react';
import ImageDisplay from './components/ImageDisplay';

const App = () => {
  const filename = '15970.jpg';

  return (
    <div>
      <ImageDisplay filename={filename} />
    </div>
  );
};

export default App;
