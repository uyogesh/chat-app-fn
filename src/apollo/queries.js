import { gql } from '@apollo/client'


export const LIST_USERS = gql`
query ListUsers($input: String) {
    users(id: $input) {
        id
        name
        email
    }
}
`

export const FETCH_MESSAGES = gql`
query FetchMessages($input: MessageInput!){
    messages(msgInput: $input){
        id
        body
        sender
        receiver
      }
}
`