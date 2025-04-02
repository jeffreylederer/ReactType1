interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    readonly VITE_SERVER_ClubName: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}