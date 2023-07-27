import { FC, useState } from "react";
import { IUser } from "../utils/Types";
import { useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const Login: FC = () => {
    const navigate = useNavigate();

    const [allUsers, setAllUsers] = useState<IUser[]>([]);

    useFetch("http://localhost:3000/users", (data) => setAllUsers(data), []);

    const handleUserClick = (user: IUser) => navigate(`/${user.id}`);

    return (
        <div className="p-2">
            <h2 className="text-slate-800">Choose a user</h2>
            <div className="p-2">
                <h3 className="text-slate-700">Admins</h3>
                <div className="p-2 flex gap-2">
                    {allUsers
                        .filter((user) => user.role === "admin")
                        .map((user, index) => (
                            <button
                                key={index}
                                className="bg-slate-600"
                                onClick={() => handleUserClick(user)}
                            >
                                {user.name}
                            </button>
                        ))}
                </div>
                <h3 className="text-slate-700">Members</h3>
                <div className="p-2 flex gap-2 flex-col">
                    {allUsers
                        .filter((user) => user.role === "member")
                        .map((user, index) => (
                            <button
                                key={index}
                                className="bg-slate-600"
                                onClick={() => handleUserClick(user)}
                            >
                                {user.name}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Login;
