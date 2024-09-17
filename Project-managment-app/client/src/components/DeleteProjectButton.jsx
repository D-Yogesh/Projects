import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { useNavigate } from "react-router-dom";

export default function DeleteProjectButton({projectId}) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}],
    })

    return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaTrash/> Delete Project
            </button>
        </div>
    )
}