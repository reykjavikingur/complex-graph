# Vue Lab

Starter kit using VueJS to create site UX design prototypes.


## Create a new site

* `npm install -g vuelab-generator`
* `vuelab init YOUR_PROJECT_NAME`
* `cd YOUR_PROJECT_NAME`


## Run the local web server

* `npm start`

This will start a web server on `localhost:3000` (or some other available port).

It will also watch `src` files for changes and live-reload whenever necessary.


## Create new routes

`node bin/create route {ROUTE_URL}`

Examples:

* `node bin/create route /shop`
* `node bin/create route /user/admin`


## Create new components

`node bin/create component {COMPONENT_NAME} {COMPONENT_PATH}`

Examples:

* `node bin/create component my-widget widget.js`
* `node bin/create component my-combo-box controls/combo-box.js`


## Edit Routes

The files in `src/assets/scripts/routes` correspond to the URL's of the web server. For example:

* The URL `/` comes from `src/assets/scripts/routes/index.js`
* The URL `/about` comes from `src/assets/scripts/routes/about.js`
* etc.


## Edit Components

The files in `src/assets/scripts/components` are the Vue components that you can use in any other component's template. For example:

* The file `src/assets/scripts/components/menu.js` defines a Vue component with the name `vl-menu`. Use it in another template as `<vl-menu/>`.


## Edit Styles

The SASS files are in `src/assets/styles`.


