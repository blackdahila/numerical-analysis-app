## Numerical Analysis App

## Development

### Prerequirements

- [yarn](https://yarnpkg.com/lang/en/docs/install/)

### Packages instalation

```
yarn
```

### Server

This project is using MySQL Database to store data.
For DB migrations make sure you have migrate tool installed:
[DbMate installation](https://dbmate.readthedocs.io/en/latest/)

1. Start MySQL server and create `numerical_analysis` database:

```
DATABASE_URL="mysql://<username>:<password>@127.0.0.1:3306/numerical_analysis" dbmate create
```

2. Create database structure:

```
DATABASE_URL="mysql://<username>:<password>@127.0.0.1:3306/numerical_analysis" dbmate -d ./migrations/ up
```

3. Starting the service

```
yarn workspaces server start
```

App will be served on `locaholst:3000`.

---

To speed up development process run service in watch mode:

```
    yarn workspaces server dev
```

### Client

1. Starting the app

```
yarn worksapces client dev
```

App will be running at http://localhost:1234.

### Client & Server

To run client and server concurrently:

```
yarn dev
```

---

In watch mode:

```
yarn start
```

## API Documentation

Documentation was created with [Swagger UI](https://swagger.io/) and is hosted within the app:

```
yarn workspaces server start
```

Documentation will be server on `localhost:3000/api-docs`