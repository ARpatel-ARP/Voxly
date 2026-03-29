import React, { useEffect } from 'react';
import Simessage from './Simessage.jsx';
import useGetMessages from '../hooks/useGetMessages.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice.jsx'; 

const Messages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    
    useEffect(() => {
        dispatch(setMessages([]));
    }, [selectedUser?._id]);

    useGetMessages();

    return (
        <div className='overflow-scroll no-scrollbar'>
            {messages?.map((message) => (
                <Simessage key={message._id} message={message} />
            ))}
        </div>
    );
}

export default Messages;