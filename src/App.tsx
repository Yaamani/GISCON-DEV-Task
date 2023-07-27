import { Routes, Route } from 'react-router-dom';
import { PATH_PARAM_USER_ID } from './utils/Constants';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<h1>Login</h1>} />
            <Route path={`/:${PATH_PARAM_USER_ID}`} element={<h1>User</h1>} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default App
