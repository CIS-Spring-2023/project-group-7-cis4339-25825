# Data Platform Frontend

This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.
For state management [Vuex](https://vuex.vuejs.org/) is used.

## Project setup

    npm install

### Before startup
This frontend uses a JSON file hosted locally to serve initial data:

    npm install -g json-server

Run JSON file from local server:

    json-server --watch data/db.json


### Compiles and hot-reloads for development

    npm run dev
