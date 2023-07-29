# GISCON-DEV-Task
## Technologies & tools used
- typescript
- [reactjs](https://react.dev/)
- [tailwind](https://tailwindcss.com/)
- [react-router-dom](https://reactrouter.com/)
- [lodash](https://lodash.com/)
- [json-server](https://github.com/typicode/json-server)
- [vite](https://vitejs.dev/)

## Requirements
- nodejs
- [yarn](https://yarnpkg.com/getting-started/install)
## How to run
```
yarn install
```
Then, you need 2 terminal windows.

One of them is for the mock json server. Note: the following command adds a 500 ms delay to each request, if you don't want any delay, simply run ```yarn mock```.
```
yarn mock -d 500
```
The other is for running the app.
```
yarn dev
```
