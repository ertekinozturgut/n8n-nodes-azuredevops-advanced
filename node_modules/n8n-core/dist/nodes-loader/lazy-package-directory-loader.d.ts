import { PackageDirectoryLoader } from './package-directory-loader';
export declare class LazyPackageDirectoryLoader extends PackageDirectoryLoader {
    loadAll(): Promise<void>;
}
