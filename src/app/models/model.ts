export interface IFolder {
    id?: number;
    icon: string;
    name: string;
    subFolders: IFolder[];
}

