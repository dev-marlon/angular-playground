import {
    Tree,
    formatFiles,
    installPackagesTask,
    updateJson,
} from '@nrwl/devkit';

import { Linter } from 'eslint';
import { libraryGenerator } from '@nrwl/angular/generators';

const pathDelimiter = '/';

export default async function (host: Tree, schema: any) {
    await libraryGenerator(host, {
        name: schema.name,
        simpleModuleName: true,
        directory: buildDirectoryString(schema),
        standaloneConfig: true,
    });

    updateEslintConfig(host, schema);

    await formatFiles(host);
    return () => {
        installPackagesTask(host);
    };
}

function buildDirectoryString(schema: any): string {
    return [schema.scope, schema.layer].join(pathDelimiter);
}

function updateEslintConfig(host: Tree, schema: any): void {
    const pathToConfig = [
        'libs',
        buildDirectoryString(schema),
        schema.name,
        '.eslintrc.json',
    ].join(pathDelimiter);

    updateJson(host, pathToConfig, (json: Linter.Config) => {
        // Use first overrides entry for "*.ts" files!
        const targetOverridesEntry = json.overrides[0];

        // Some eslint rules require type information and therefore a tsconfig
        // for the typescript-parser
        // See https://nx.dev/latest/angular/guides/eslint#rules-requiring-type-information
        targetOverridesEntry['parserOptions'] = {
            project: 'tsconfig.?*.json',
        };

        // The @typescript-eslint/no-inferrable-types rule from the root config
        // is overridden by plugin:@nrwl/nx/angular in this library root.
        // We have to add and configure it again
        targetOverridesEntry.rules['@typescript-eslint/no-inferrable-types'] = [
            'error',
            {
                ignoreParameters: true,
                ignoreProperties: true,
            },
        ];

        // Remove not needed selector-prefix rules
        delete targetOverridesEntry.rules['@angular-eslint/component-selector'];
        delete targetOverridesEntry.rules['@angular-eslint/directive-selector'];

        return json;
    });
}
