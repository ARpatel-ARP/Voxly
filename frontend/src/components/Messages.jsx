import React from 'react';
import Simessage from './Simessage';
import useGetMessages from '../hooks/useGetMessages.jsx';
import { useSelector } from 'react-redux';

const Messages = () => {
    useGetMessages()
    const {messages} = useSelector(store=>store.message)
    if (!messages) return;
  return (
   <div className='overflow-scroll no-scrollbar'>
   {
    messages?.map((message) => {
      return(
        <Simessage key={message._id} message={message}/>
      )
    }
    )
   }
   </div>
  );
}

export default Messages;
