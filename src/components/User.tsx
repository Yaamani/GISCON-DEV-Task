import { FC, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { PATH_PARAM_USER_ID } from "../utils/Constants";
import { IUser } from "../utils/Types";
import useFetch from "../hooks/useFetch";
import Member from "./Member";
import Admin from "./Admin";

type UserPathParams = {
    [key in typeof PATH_PARAM_USER_ID]: string;
};

const User: FC = () => {
    const navigate = useNavigate();

    const params = useParams<UserPathParams>();
    const userId = Number(params[PATH_PARAM_USER_ID]);

    const [user, setUser] = useState<IUser>();

    useFetch(`http://localhost:3000/users/${userId}`, (data) => setUser(data), [userId]);

    return (
        <div className="p-2">
            <div className="grid grid-cols-3">
                <h2 className="text-slate-800 col-span-2">Welcome back, {user?.name}!</h2>
                <button
                    className="ml-auto"
                    onClick={() => navigate("/")}
                >
                    logout
                </button>
            </div>
            <Routes>
                {user !== undefined && (
                    <Route
                        path="/*"
                        element={user.role === "admin" ? <Admin /> : <Member user={user} />}
                    />
                )}
            </Routes>
            {user === undefined && <h1>Loading...</h1>}
        </div>
    );
};

export default User;
