import { useMutation, useQuery } from "@apollo/client";
import {FaTrash} from 'react-icons/fa';
import { DELETE_CLIENT, GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function Clients () {
    const {loading, data, error} = useQuery(GET_CLIENTS);
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}]
        // update(cache, {data: {deleteClient}}) {
        //     const {clients} = cache.readQuery({query: GET_CLIENTS});
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {clients: clients.filter(client => client.id !== deleteClient.id)}
        //     })
        // }
    })

    if(loading) return <Spinner/>
    if(error) {
        console.log(error);
        return <p>Something went wrong</p>;
    }

    return (
        <>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.clients.map( client => {
                            return (
                                <tr key={client.id}>
                                    <td>
                                        {client.name}
                                    </td>
                                    <td>
                                        {client.email}
                                    </td>
                                    <td>
                                        {client.phone}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => {deleteClient({variables: {id: client.id}})}}>
                                            <FaTrash/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}