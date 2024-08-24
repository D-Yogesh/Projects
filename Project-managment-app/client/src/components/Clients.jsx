import { useQuery } from "@apollo/client";
import {FaTrash} from 'react-icons/fa';
import { GET_CLIENTS } from "../queries/clientQueries";

export default function Clients () {
    const {loading, data, error} = useQuery(GET_CLIENTS);

    if(loading) return <p>Loading...</p>;
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
                                <tr key={client.name}>
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
                                        <button className="btn btn-danger btn-sm">
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