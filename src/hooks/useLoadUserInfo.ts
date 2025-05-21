import { useEffect,useState } from "react"
import useGetUserInfo from "./useGetUserInfo"
import { useRequest } from "ahooks"
import { getUserInfoService } from "../services/user"
import { useDispatch } from "react-redux"
import { loginReducer } from "../store/useReducer"
function useLoadUserData() {
    const dispatch = useDispatch()
    const [waitingUserData,setWaitingUserData] = useState(true)


    // ajax 加载用户信息
    const {run} = useRequest(getUserInfoService,{
        manual: true,
        onSuccess(result)  {
            const {username,nickname} = result
            // 存储到redux
            dispatch(loginReducer({username,nickname}))
        },
        onFinally() {
            setWaitingUserData(false)
        }
    })

    // 判断当前redux store是否已经存在用户信息
    const {username} = useGetUserInfo()
    useEffect(() => {
        if (username) {
            setWaitingUserData(false)
            return
        }
        run() // 没有用户信息进行请求加载

    },[username])


    return {waitingUserData}
}

export default useLoadUserData