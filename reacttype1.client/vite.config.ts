import { defineConfig } from 'vitest/config';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';
import { CssModuleTypes } from "./watching-css-modules.ts";


const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "reacttype1.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7057';


// https://vitejs.dev/config/
export default defineConfig({
    

   
        plugins: [plugin(), CssModuleTypes()],
        test: {
            globals: true,
            environment: 'happy-dom'
        },
        envDir: './environment',
        resolve: {
            alias: {
                '@components': "/src/components",
                '@images': "/src/images",
                '@layouts': "/src/layouts",
                '@pages': "/src/pages",
                '@hooks': "/src/hooks",
                '@styles': "/src/styles",
            },
        },
        server: {
            proxy: {
                '^/weatherforecast': {
                    target,
                    secure: false
                },
                '/api': {
                    target: 'http://localhost:5164',
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                }

            },
            port: 5173,
            //https: {
            //    key: fs.readFileSync(keyFilePath),
            //    cert: fs.readFileSync(certFilePath),
            //}
        }
   
})
