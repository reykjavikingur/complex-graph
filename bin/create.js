const fs = require('fs');
const Path = require('path');
const Promise = require('promise');
const mkdirp = require('mkdirp');

const writeFile = Promise.denodeify(fs.writeFile);
const makeDirectory = Promise.denodeify(mkdirp);

const ROUTE_PATH = 'src/assets/scripts/routes';
const COMPONENT_PATH = 'src/assets/scripts/components';

const renderRoute = (data) => `\
var template = \`
<div>
PLACEHOLDER PAGE: ${data.name}
</div>
\`;

module.exports = Vue.component('${data.name}', {
    template: template
});
`;

const renderComponent = (data) => `\
var template = \`
<div>
PLACEHOLDER COMPONENT: ${data.name}
</div>
\`;

module.exports = Vue.component('${data.name}', {
    template: template
});
`;

function create(args) {
    return new Promise((resolve, reject) => {
        var validTypes = ['route', 'component'];
        var type = args.shift();
        if (!type) {
            console.error(`Error: Please specify type of definition to create: (${validTypes.join(', ')})`);
            reject();
        }
        else if ('route'.indexOf(type) === 0) {
            createRoute(args).then(resolve, reject);
        }
        else if ('component'.indexOf(type) === 0) {
            createComponent(args).then(resolve, reject);
        }
        else {
            console.error(`Error: Invalid type. You must use one of the following: ${validTypes.join(', ')}`);
            reject();
        }
    });
}

function createRoute(args) {
    return new Promise((resolve, reject) => {
        var path = args.shift();
        if (!path) {
            console.error('Error: Please specify the URL for your route.\nExamples: /shop, /user/admin');
            reject();
        }
        else {
            if (Path.extname(path)) {
                console.error('Error: URL must not have a file extension.');
                reject();
            }
            else if (path.indexOf('..') >= 0) {
                console.error('Error: URL must be normalized.');
                reject();
            }
            else {
                var file = Path.join(ROUTE_PATH, path + '.js');
                var name = path.split('/').filter(part => part).join('-') + '-page';
                var string = renderRoute({name: name});
                console.log('creating', file);
                makeDirectory(Path.dirname(file))
                    .then(r => writeFile(file, string, 'utf8'))
                    .then(resolve, reject)
                ;
            }
        }
    });
}

function createComponent(args) {
    return new Promise((resolve, reject) => {
        var name = args.shift();
        if (!name) {
            console.error('Error: Please specify a name for your component.\nExamples: custom-widget, simple-combo-box');
            reject();
        }
        else if (!validateComponentName(name)) {
            reject();
        }
        else {
            var path = args.shift();
            if (!path) {
                console.error(`Error: Please specify a path for your component file (relative to ${COMPONENT_PATH})\nExamples: custom-widget.js, controls/simple-combo-box.js`);
                reject();
            }
            else if (path.indexOf('..') >= 0) {
                console.error('Error: File path must be normalized.');
                reject();
            }
            else {
                var validExtension = '.js';
                var extension = Path.extname(path);
                if (extension && extension !== validExtension) {
                    console.error('Invalid extension. Changing to', validExtension);
                }
                var file = Path.join(COMPONENT_PATH, Path.dirname(path), Path.basename(path, extension)) + validExtension;
                var string = renderComponent({name: name});
                console.log('creating', file);
                makeDirectory(Path.dirname(file))
                    .then(r => writeFile(file, string, 'utf8'))
                    .then(resolve, reject)
                ;
            }
        }
    });
}

function validateComponentName(name) {
    var message;
    if (name.indexOf('-') < 0) {
        message = 'Use at least one hyphen';
    }
    if (!/^[\w\-]+$/.test(name)) {
        message = 'Use only alphanumeric characters and hyphens.';
    }
    if (message) {
        console.error('Error: Invalid component name.', message);
        return false;
    }
    else {
        return true;
    }
}

create(process.argv.slice(2))
    .then(r => {
        process.exit();
    }, e => {
        if (e) {
            console.error(e);
        }
        process.exit(1);
    })
;
