import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import ChatComponent from '../../components/chat/chat'
import { LIST_USERS } from '../../apollo/queries'
import { SEND_MESSAGE } from '../../apollo/mutations'
import { SUBSCRIBE_NEW_MESSAGE } from '../../apollo/subscriptions'
import './style.css'

const UsersList = props => {
  const [selectedUser, setSelUser] = useState(null)
  const [userList, setList] = useState([])
  const [self, setSelf] = useState({})

  const { data, error, loading, refetch } = useQuery(LIST_USERS, {
    variables: {
      self: props.location?.state?.user?.user?.id || ''
    },
    onCompleted: () => {
      const selfAcc = data.users.filter(d => d.email === props.location.state.user)[0]
      setSelf(selfAcc)
    }
  })

  const [
    sendMessage,
    { data: msgData, loading: msgLoading, error: msgError }
  ] = useMutation(SEND_MESSAGE)

  const { data: subData, error: subError } = useSubscription(
    SUBSCRIBE_NEW_MESSAGE,
    {
      variables: {
        targetId: props.location?.state?.user?.user?.id
      },
      onSubscriptionData: () => {
        console.log('Data received: ', subData)
      }
    }
  )

  const handleItemClicked = user => {
    setSelUser(user)
  }

  const handleSendMessage = (message, receiver) => {
    sendMessage({
      variables: {
        input: {
          message: message,
          sender: self.id,
          receiver
        }
      }
    })
  }
console.log("Self User: ", self)
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className='user-container'>
          <h3>Connect with them.</h3>
          <div className='user-wrap'>
            {data.users.map((user, index) => (
              <div
                className='user-item'
                key={user.id}
                onClick={() => handleItemClicked(user)}
              >
                <p className='user-name'>{user.name}</p>
                <p className='user-email'>{user.email}</p>
              </div>
            ))}
          </div>
          {selectedUser && (
            <ChatComponent
              senderId={self?.id}
              currentUser={selectedUser}
              onSend={handleSendMessage}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default UsersList
