import React from 'react';

const CenteredLayout = ({ children}) => {
  return (
    <div className= 'h-screen flex justify-center items-center bg-gray-500'>
      {children}
    </div>
  );
};

export default CenteredLayout;
