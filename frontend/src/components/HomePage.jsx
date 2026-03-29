import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const HomePage = () => {
  return (
    <div className='flex sm:h-112.5 md:h-137.5 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-[0.5px] border-gray-400'>
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
export default HomePage;
