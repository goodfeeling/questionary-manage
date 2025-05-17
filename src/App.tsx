import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from "./router"
import "antd/dist/reset.css"
import '@ant-design/v5-patch-for-react-19';
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
