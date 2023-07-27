import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { PATH_PARAM_USER_ID } from "../utils/Constants";
import { IUser } from "../utils/Types";
import useFetch from "../hooks/useFetch";

type Params = {
    [key in typeof PATH_PARAM_USER_ID]: string;
};

const User: FC = () => {
    const params = useParams<Params>();
    const userId = Number(params[PATH_PARAM_USER_ID]);

    const [user, setUser] = useState<IUser>();

    useFetch(`http://localhost:3000/users/${userId}`, (data) => setUser(data), [userId]);

    return (
        <div className="p-2">
            <h2 className="text-slate-800">Welcome back, {user?.name}!</h2>
        </div>
    );
};

export default User;
