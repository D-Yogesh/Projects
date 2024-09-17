import { useMutation } from "@apollo/client";
import { useState } from "react"
import { GET_PROJECT, UDPATE_PROJECT } from "../queries/projectQueries";

export default function EditProject ({project}) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState(project.status)

    const [updateProject] = useMutation(UDPATE_PROJECT, {
        variables: {id: project.id, name, description, status},
        refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}]
    })

    const onSubmitHandler = e => {
        e.preventDefault();

        if(name === '' || description === '' || status === '')
            return alert('Please fill all the fields.')
        updateProject();

    }
    return (
        <div className="mt-5">
            <h3>Update Project details</h3>
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
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}