import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const Login: FunctionComponent = () => {
    const nav = useNavigate()
    return (
        <div>
            <p>login</p>
            <div>
                <button onClick={()=> nav(-1)}>返回</button>
            </div>
    </div>
    )
}

export default Login