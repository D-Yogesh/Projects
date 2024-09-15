import { useState } from "react";
import { FaList, FaProjectDiagram, FaRProject } from "react-icons/fa";

export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState();

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(name, description, status, clientId);

        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    }

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
                            Phone
                        </label>
                        <select id="status" className="form-select"
                        value={status}
                        onChange={e => setStatus(e.target.value)}>
                            <option value={'new'}>Not started</option>
                            <option value={'progress'}>In Progress</option>
                            <option value={'completed'}>Completed</option>
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