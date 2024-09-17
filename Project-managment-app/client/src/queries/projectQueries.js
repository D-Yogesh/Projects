import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
        }
    }
`

const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!){
        addProject(name: $name, description: $description, status: $status, clientId: $clientId){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id){
            id
        }
    }
`

const UDPATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatus! ){
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

export {GET_PROJECTS, GET_PROJECT, ADD_PROJECT, DELETE_PROJECT, UDPATE_PROJECT};