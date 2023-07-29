import { FC } from "react";
import { IUser, IUserMemberRole, PageId } from "../utils/Types";
import { useLocation, useParams } from "react-router-dom";
import {
    MESSAGE_YOU_DONT_HAVE_PERMISSION_TO_ACCESS_THIS_PAGE,
    PATH_PARAM_PAGE_ID,
    PATH_PARAM_USER_ID,
} from "../utils/Constants";

type MemberPageProps = {
    user: IUser<IUserMemberRole>;
};

type MemberPagePathParams = {
    [key in typeof PATH_PARAM_USER_ID]: string;
} & {
    [key in typeof PATH_PARAM_PAGE_ID]: PageId;
};

const MemberPage: FC<MemberPageProps> = ({ user }) => {
    const location = useLocation();
    const params = useParams<MemberPagePathParams>();

    const title = location.state?.title;
    const pageId = params.pageId;
    const pagePermissions = pageId && user.permissions[pageId];

    if (pagePermissions === undefined) {
        return <h1>{MESSAGE_YOU_DONT_HAVE_PERMISSION_TO_ACCESS_THIS_PAGE}</h1>;
    }

    return (
        <>
            <h3 className="my-4">{title}</h3>
            <div className="flex gap-4 flex-col sm:flex-row">
                {pagePermissions &&
                    Object.keys(pagePermissions).sort((a, b) => a.localeCompare(b)).map((blockId, index) => (
                        <div
                            key={index}
                            className="bg-slate-800 text-slate-50 w-full h-72 sm:w-72 text-center"
                        >
                            {blockId}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default MemberPage;
