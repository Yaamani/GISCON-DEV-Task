import { FC } from "react";
import { IUser, IUserMemberRole, PageId } from "../utils/Types";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import { PATH_PARAM_PAGE_ID } from "../utils/Constants";
import MemberPage from "./MamberPage";

type MemberProps = {
    user: IUser<IUserMemberRole>;
};

const Member: FC<MemberProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleClick = (relativeLink: PageId, title: string) => {
        navigate(relativeLink, { state: { title } });
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="grid grid-cols-4 gap-6">
                        <button
                            className="col-start-2 col-end-3 w-full"
                            onClick={() => handleClick("page1", "Page 1")}
                        >
                            Page 1
                        </button>
                        <button
                            className="col-start-3 col-end-4 w-full"
                            onClick={() => handleClick("page2", "Page 2")}
                        >
                            Page 2
                        </button>
                    </div>
                }
            />
            <Route path={`/:${PATH_PARAM_PAGE_ID}`} element={<MemberPage user={user} />} />
        </Routes>
    );
};

export default Member;
