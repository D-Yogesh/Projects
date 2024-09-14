import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

export default function Projects () {
    const {loading, data, error} = useQuery(GET_PROJECTS);

    if(loading) return <Spinner/>
    if(error) return <p>Something went wrong</p>
    return (
        <>
            <div className="row mt-4">
                {
                    data.projects.length > 0 ?
                    data.projects.map( project => 
                        <ProjectCard key={project.id} project={project} />
                    ) :
                    <p>No Projects</p>
                }
            </div>
        </>
    )
}