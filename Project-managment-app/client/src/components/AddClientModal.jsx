import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT, GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: {addClient}}) {
            const {clients} = cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: [...clients, addClient]}
            })
        }
    })

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(name == '' || email == '' || phone == '') {
            return alert('Please fill in all fields');
        }
        addClient(name, email, phone);
    }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClient"
      >
        <div className="d-flex align-items-center">
            <FaUser className="icon"/>
            <div>
                Add Client
            </div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClient"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addClientLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientLabel">
                Add Client
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
                            Email
                        </label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Phone
                        </label>
                        <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="submit"
                            className="btn btn-secondary"
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
  );
}
