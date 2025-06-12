interface ImportMetaEnv {
    readonly VITE_SERVER_ClubName: string;
    readonly VITE_SERVER_Website: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}