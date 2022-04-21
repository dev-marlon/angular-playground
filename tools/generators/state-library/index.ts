import {
    Tree,
    formatFiles,
    installPackagesTask,
    generateFiles,
    joinPathFragments,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/angular/generators';

const pathDelimiter = '/';
const libraryLayerName = 'state';
const templatePathName = 'files';

function camelize(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function uppercase(value: string) {
    return value.toUpperCase();
}

function uppercaseFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function lowercase(value: string) {
    return value.toLowerCase();
}

function lowercaseFirstLetter(value: string) {
    return value.charAt(0).toLowerCase() + value.slice(1);
}

export default async function (host: Tree, schema: any) {
    const camelizedName = camelize(schema.name);

    await libraryGenerator(host, {
        name: camelizedName,
        simpleModuleName: true,
        directory: [schema.scope, libraryLayerName].join(pathDelimiter),
        standaloneConfig: true,
    });

    generateFiles(
        host,
        joinPathFragments(__dirname, `.${pathDelimiter}${templatePathName}`),
        [createStateLibraryPath(schema), pathDelimiter].join(pathDelimiter),
        {
            tmpl: '',
            uppercase,
            uppercaseFirstLetter,
            lowercase,
            lowercaseFirstLetter,
            name: camelizedName,
        }
    );

    deleteFiles(host, schema, [
        `src${pathDelimiter}lib${pathDelimiter}${schema.name}.ts`,
        `src${pathDelimiter}lib${pathDelimiter}${schema.name}.spec.ts`,
    ]);

    await formatFiles(host);

    return () => {
        installPackagesTask(host);
    };
}

function deleteFiles(host: Tree, schema: any, filePaths: string[]): void {
    filePaths.forEach((file: string) => {
        const filePath = [createStateLibraryPath(schema), file].join(
            pathDelimiter
        );

        deleteFile(host, filePath);
    });
}

function deleteFile(host: Tree, filePath: string): void {
    if (host.exists(filePath) === false) {
        return;
    }

    host.delete(filePath);
}

function createStateLibraryPath(schema: any): string {
    return ['libs', schema.scope, libraryLayerName, schema.name].join(
        pathDelimiter
    );
}
