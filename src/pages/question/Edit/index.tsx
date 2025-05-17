import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

const Edit: FunctionComponent = () => {
    const {id} = useParams()
    return <><p>Edit {id}</p></>
}

export default Edit