declare module "*.css" { }
declare module "*.png" {
    const value: string;
    export = value;
}