import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList} from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import { ADD_PROJECT, GET_PROJECTS } from "../queries/projectQueries";

export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NotStarted');
    const [clientId, setClientId] = useState();

    const {loading, data, error} = useQuery(GET_CLIENTS)

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name, description, status, clientId},
        update(cache, {data: {addProject}}) {
            const {projects} = cache.readQuery({query: GET_PROJECTS});

            // console.log(projects, addProject)
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: [...projects, addProject]}
            })
        }
    })

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        if(name === '' || description === '' || status=== '' || clientId === '') return alert('Please fill in all fields');

        addProject(name, description, status, clientId)

        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    }

    if(loading) return <Spinner/>
    if(error) return <p className="text-danger">Something went wrong</p>

    return (
        <>
            <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle='modal'
            data-bs-target='#addProject'>
                <div className="d-flex align-items-center">
                    <FaList className="icon"/>
                    New Project
                </div>
            </button>
            <div
        className="modal fade"
        id="addProject"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addProjectLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectLabel">
                New Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>
                        <textarea 
                        id='description'
                        className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Status
                        </label>
                        <select id="status" className="form-select"
                        value={status}
                        onChange={e => setStatus(e.target.value)}>
                            <option value={'NotStarted'}>Not started</option>
                            <option value={'InProgress'}>In Progress</option>
                            <option value={'Completed'}>Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Client
                        </label>
                        <select name="client" id="clientId" className="form-select" value={clientId} onChange={e => setClientId(e.target.value)}>
                            <option value={""}>Select...</option>
                            {data.clients.length && data.clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}