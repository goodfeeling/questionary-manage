import { FunctionComponent } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { MANAGE_PATHNAME } from "../router";

const NotFound: FunctionComponent = () => {
    const nav = useNavigate()
    return <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在"
        extra={<Button type="primary" onClick={()=>nav(MANAGE_PATHNAME)}>返回首页</Button>}
    />
}

export default NotFound