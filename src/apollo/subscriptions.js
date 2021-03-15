import { gql } from '@apollo/client'

export const SUBSCRIBE_NEW_MESSAGE = gql`
    subscription($targetId: String!){
        newMessage(targetId: $targetId){
            message
            sender
            receiver
        }
    }
`