import { useAtom } from "jotai";
import Page from "./Page";
import { pageAtom, pages } from "./UI"

const Book = (props) => {
    const [page] = useAtom(pageAtom)
    return (
        <group {...props}>
            {
                pages.map((pageData, index) => (
                    <Page key={index} number={index} page={page} opened={page > index} bookClosed={page === 0 || page === pages.length} {...pageData} />
                ))
            }
        </group>
    )
}

export default Book;