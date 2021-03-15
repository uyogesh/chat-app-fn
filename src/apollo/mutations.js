import { gql } from '@apollo/client'

export const USER_SIGNUP = gql`
  mutation USER_SIGNUP($input: UserDataInput!) {
    createUser(userData: $input) {
      user {
        role
        email
        name
        id
      }
      tokens {
        access {
          token
          expires
        }
        refresh {
          token
          expires
        }
      }
    }
  }
`

export const USER_LOGIN = gql`
  mutation USER_LOGIN($input: LoginDataInput!) {
    loginUser(loginData: $input) {
      user {
        id
        name
        email
      }
      tokens {
        access {
          token
          expires
        }
        refresh {
          token
          expires
        }
      }
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation SEND_MESSAGE($input: MessageDataInput!) {
    sendMessage(msgData: $input) {
      status
    }
  }
`
