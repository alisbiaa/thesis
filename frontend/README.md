# Technology
This is a [React](https://reactjs.org/) based application. 

I am using [Ant Design](https://ant.design/) an UI design language and React UI library with 
a set of high-quality React components, one of best React UI library for enterprises.

The whole stack is coded using [TypeScript](https://www.typescriptlang.org/).

# Project Structure
React is JavaScript library from Facebook, that is designed to create interactive UIs. The main features are that it’s

- `declarative`: Design different views for each state, which will be efficiently updated and re-rendered
- `component-based`: Build components, that manage their own state and structure them together into more complex UIs
- maintains an `internal representation` of the rendered UI (“virtual DOM”), that renders only the changed elements

[:open_file_folder:`src`](/src) is the source folder where the [:page_facing_up:`src/index.tsx`](/src/index.tsx) is the parent component.

[:open_file_folder:`src/pages`](/src/pages) is where I did map the `routes` and the `components`.

e.g. [:page_facing_up:`/src/pages/profile/index.tsx`](/src/pages/profile/index.tsx) is the `component` rendered for the route `/profile`.

## Login
Upon opening the application, clearly the first thing you have to do is to `log-in`.

For this I am using `Azure Active Directory` of the Faculty, i.e. for all the citizens of `ELTE` have access to it.

In case this is the first time you `log-in` an account 
will be automatically created with your user credential retrieved from `AAD`.

In [:open_file_folder: /src/config/authConfig.ts](/src/config/authConfig.ts) you can find all the settings related to `AAD`.

Upon your attempt to log-in the `front-end` sends an `API` request to the `back-end` 
with your `email` to retrieve your `data`.  

This is what the `user` model look like:
```typescript
interface IUser {
    email: string;
    name: string;
    bio: string | null;
    department_id: string | null;
    role: "student" | "teacher" | "admin" | "RO";
    banned : boolean
}
```
By default, your user `role` will be set-up as `RO`, which stands for `read-only`.

The `role` of the user profile will be the key of what a user have access to and what is restricted for him.

## Routes
[:page_facing_up:`/src/App.tsx`](/src/App.tsx) is where all the `8` routes are defined. 

```html
<Route path={"/"} element={<Home/>}/>
<Route path={"/profile"} element={<Profile/>}/>
<Route path={"/ask"} element={<Ask/>}/>
<Route path={"/search"} element={<Search/>}/>
<Route path={"/question/:id"} element={<View/>}/>
<Route path={"/department/:id"} element={<Department/>}/>
<Route path={"/admin/users"} element={<Users/>}/>
<Route path={"*"} element={<NotFound/>}/>
```

The `*` redirect all the undeclared `routes` to `404 not found page`.

Each `route` has its parent `component`. 

Each `component` has `child components`. 

The display of these `child components` is based on the `user role`,
i.e. some `components` are only accessible by `admin` and restricted for the rest. 

The sidebar is what would mainly allow you to navigate through the application.

## MVC
MVC is a way of thinking to structure your web application. 
It’s popular because it’s used by many frameworks that implement that structure (rails, cakephp, django etc.).
The architecture stems from the traditional flow of a web application.

MVC stands for:
- View — Client [:open_file_folder: src/pages](/src/pages)
Displays visualization of the data to the user. Only connected to the controller.

- Controller — Server [:open_file_folder: src/pages](/src/api)
Processes server-side logic and acts as a middleware between View and Model, i.e. controlling the flow of data.

- Model — Database
Processing data from or to the database. Only connected to the controller.

> **Note**
> See a practical example [here](https://www.tutorialspoint.com/design_pattern/mvc_pattern.htm)

## Tree


# Security

