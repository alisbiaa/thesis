# Technology
This is a [React](https://reactjs.org/) based application. 

I am using [Ant Design](https://ant.design/) an UI design language and React UI library with 
a set of high-quality React components, one of best React UI library for enterprises.

The whole stack is coded using [TypeScript](https://www.typescriptlang.org/).

# Project Structure
## MVC
MVC is a way of thinking to structure your web application. 
It’s popular because it’s used by many frameworks that implement that structure (rails, cakephp, django etc.).
The architecture stems from the traditional flow of a web application.

MVC stands for:
- View — Client
Displays visualization of the data to the user. Only connected to the controller.

- Controller — Server
Processes server-side logic and acts as a middleware between View and Model, i.e. controlling the flow of data.

- Model — Database
Processing data from or to the database. Only connected to the controller.

> **Note**
> See a practical example [here](https://www.tutorialspoint.com/design_pattern/mvc_pattern.htm)

## Tree
    --   .dockerignore
    --   .env
    --   babel.config.js
    --   Dockerfile.dev
    --   jest.config.ts
    --   package-lock.json
    --   package.json
    --   tree.txt
    --   tsconfig.json
    --
    --------src
        --   Server.ts
        --   swagger.json
        --
        --------controllers
        --------middlewares
        --------models
        --------routes
        --------utils
        --------__tests__

# Security

