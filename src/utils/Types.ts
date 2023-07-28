export type AllKeys<T> = T extends any ? keyof T : never;

export type IUserAdminRole = {
    role: "admin";
};

export type IUserMemberRole = {
    role: "member";
    permissions: {
        page1?: { block1?: true; block2?: true; block3?: true };
        page2?: { block4?: true; block5?: true };
    };
}

export type IUser<Role extends IUserAdminRole | IUserMemberRole = IUserAdminRole | IUserMemberRole> = {
    id: number;
    name: string;
} & Role;

// export type UserRole = IUserAdminRole["role"] | IUserMemberRole["role"];
export type PageId = keyof IUserMemberRole["permissions"];
export type BlockId = AllKeys<IUserMemberRole["permissions"][PageId]>;
