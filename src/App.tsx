import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { PATH_PARAM_USER_ID } from './utils/Constants';
import User from './components/User';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path={`/:${PATH_PARAM_USER_ID}`} element={<User/>} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default App
