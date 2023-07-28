import { ChangeEvent, FC, useCallback, useState } from "react";
import { BlockId, IUser, IUserAdminRole, IUserMemberRole, PageId } from "../utils/Types";
import useFetch from "../hooks/useFetch";
import _ from "lodash";

type AdminPageProps = {
    // user: IUser<IUserAdminRole>;
};

const Admin: FC<AdminPageProps> = () => {
    const [allMembersMap, setAllMembersMap] = useState(
        new Map<IUser["id"], IUser<IUserMemberRole>>()
    );
    const [selectedMember, setSelectedMember] = useState<IUser<IUserMemberRole> | undefined>();

    const [reftech, setRefetch] = useState(true);
    useFetch(
        `http://localhost:3000/users?role=${"member" satisfies IUserMemberRole["role"]}`,
        (data: IUser<IUserMemberRole>[]) => {
            const newAllMembersMap = new Map(data.map((user) => [user.id, user]));
            setAllMembersMap(newAllMembersMap);
            if (data.length > 0)
                setSelectedMember(
                    _.cloneDeep(newAllMembersMap.get(selectedMember?.id ?? 0) ?? data[0])
                );
            setRefetch(false);
        },
        [reftech],
        !reftech
    );

    const checkedPage = useCallback(
        (pageId: PageId) => pageId in (selectedMember?.permissions ?? {}),
        [allMembersMap, selectedMember]
    );

    const checkedBlock = useCallback(
        (pageId: PageId, blockId: BlockId) =>
            blockId in (selectedMember?.permissions[pageId] ?? {}),
        [allMembersMap, selectedMember]
    );

    const handleChangePage = useCallback(
        (pageId: PageId) => (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.checked) {
                const newSelectedMember = _.cloneDeep(selectedMember);
                if (newSelectedMember !== undefined) {
                    delete newSelectedMember.permissions[pageId];
                    setSelectedMember(newSelectedMember);
                }
            } else {
                const newSelectedMember = _.cloneDeep(selectedMember);
                if (newSelectedMember !== undefined) {
                    newSelectedMember.permissions[pageId] = {};
                    setSelectedMember(newSelectedMember);
                }
            }
        },
        [selectedMember]
    );

    const handleChangeBlock = useCallback(
        (pageId: PageId, blockId: BlockId) => (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.checked) {
                const newSelectedMember = _.cloneDeep(selectedMember);
                if (newSelectedMember !== undefined) {
                    delete (newSelectedMember.permissions[pageId] as any)[blockId];
                    setSelectedMember(newSelectedMember);
                }
            } else {
                const newSelectedMember = _.cloneDeep(selectedMember);
                if (newSelectedMember !== undefined) {
                    if (newSelectedMember.permissions[pageId] === undefined)
                        newSelectedMember.permissions[pageId] = {};
                    (newSelectedMember.permissions[pageId] as any)[blockId] = true;
                    setSelectedMember(newSelectedMember);
                }
            }
        },
        [selectedMember]
    );

    return (
        <div className="flex gap-5 flex-col">
            <div className="flex gap-2 items-center">
                <label htmlFor="members">Select a member: </label>
                <select
                    name="members"
                    id="members"
                    value={selectedMember?.id}
                    onChange={(e) =>
                        setSelectedMember(_.cloneDeep(allMembersMap.get(Number(e.target.value))))
                    }
                >
                    {Array.from(allMembersMap.values()).map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-wrap gap-5">
                <div>
                    <input
                        type="checkbox"
                        id="page1"
                        checked={checkedPage("page1")}
                        onChange={handleChangePage("page1")}
                    />
                    <label className="p-2" htmlFor="page1">
                        Page 1
                    </label>
                    <div className="p-2">
                        <input
                            type="checkbox"
                            id="block1"
                            checked={checkedBlock("page1", "block1")}
                            onChange={handleChangeBlock("page1", "block1")}
                        />
                        <label className="p-2" htmlFor="block1">
                            Block 1
                        </label>
                        <input
                            type="checkbox"
                            id="block2"
                            checked={checkedBlock("page1", "block2")}
                            onChange={handleChangeBlock("page1", "block2")}
                        />
                        <label className="p-2" htmlFor="block2">
                            Block 2
                        </label>
                        <input
                            type="checkbox"
                            id="block3"
                            checked={checkedBlock("page1", "block3")}
                            onChange={handleChangeBlock("page1", "block3")}
                        />
                        <label className="p-2" htmlFor="block3">
                            Block 3
                        </label>
                    </div>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="page2"
                        checked={checkedPage("page2")}
                        onChange={handleChangePage("page2")}
                    />
                    <label className="p-2" htmlFor="page2">
                        Page 2
                    </label>
                    <div className="p-2">
                        <input
                            type="checkbox"
                            id="block4"
                            checked={checkedBlock("page2", "block4")}
                            onChange={handleChangeBlock("page2", "block4")}
                        />
                        <label className="p-2" htmlFor="block4">
                            Block 4
                        </label>
                        <input
                            type="checkbox"
                            id="block5"
                            checked={checkedBlock("page2", "block5")}
                            onChange={handleChangeBlock("page2", "block5")}
                        />
                        <label className="p-2" htmlFor="block5">
                            Block 5
                        </label>
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    fetch(`http://localhost:3000/users/${selectedMember?.id}`, {
                        method: "PATCH",
                        body: JSON.stringify(selectedMember),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    })
                        .then((data) => data.json())
                        .then(() => setRefetch(true))
                        .catch((error) => alert(error));
                }}
            >
                Save
            </button>
        </div>
    );
};

export default Admin;
