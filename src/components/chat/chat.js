import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_MESSAGES } from '../../apollo/queries'
import './style.css'

const ChatComponent = ({ senderId, currentUser, onSend }) => {
  const [msg, setMessage] = useState('')
  
  const { data, loading, error, refetch } = useQuery(FETCH_MESSAGES, {
    variables: {
      input: {
        sender: senderId,
        receiver: currentUser.id
      }
    },
    onCompleted: () => {
      console.log('Messages list: ', data)
    }
  })
  return (
    <div className='chat-area'>
      <div className='chat-header'>
        <p>{currentUser.email}</p>
        <p>{currentUser.name}</p>
      </div>
      <div className='chat-body'>
        {data && data.messages && (
          <div>
            {data.messages.map(msg => {
              return (
                <div key={`${msg.id}`}>
                  <p>{msg.body}</p>
                  <p>{msg.created_at}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className='chat-input'>
        <input
          className='text-input'
          value={msg}
          onChange={e => {
            setMessage(e.target.value)
          }}
        />
        <button
          className='chat-submit'
          onClick={() => {
            onSend(msg, currentUser.id)
            setMessage("")
            refetch({input: {sender: senderId, receiver: currentUser.id}})
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
export default ChatComponent
