import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
    query {
        clients {
            id
            name
            email
            phone
        }
    }
`

export const DELETE_CLIENT = gql`
    mutation deleteClient($id: String!){
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`