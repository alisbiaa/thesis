The emergence and rapid spread of the Coronavirus in the spring of 2020 has fundamentally changed our lives. The most important change has been the attempt to minimize face–to–face contacts everywhere in order to keep the epidemic under control. Public gatherings were banned, shopping malls were closed, and sporting events were also cancelled. Inevitably, institutions had to switch to emergency remote education (ERE) at very short notice, which presented several problems for all participants.


The pandemic widened preexisting opportunity and achievement gaps, hitting historically disadvantaged students hardest. Specifically, in ELTE, getting in touch with our lecturers and professors was challenging. From my personal experience, studying for almost 2 years remotely had a huge impact on my perception of information, finding myself unable to reach out to my teachers was a huge block. Furthermore, some lectures were not allowed to be recorded and posting the materials of our labs was a no-go in most cases. Objectively speaking, they are not to be blamed for this. Given the overwhelming number of questions, a teacher might receive per day, it is absolutely impossible to keep up with it.


Therefore, I decided to solve this problem, by creating a platform that unites teachers and students to communicate. Think about it as a small library. This project aims to facilitate problem-solving and interaction between the faculty members. This platform will be a middleware between instructors and students to ask questions and validate the right answers. And exclusively available for ELTE members, as a compliance with privacy policies of the University

# Get Started
## Prerequistes
- Download & Install [Node.js](https://nodejs.org/en/)
- Create Azure Subscription for Active Directory
- MongoDB database
## Enviroment variables
> **Note**
> In order to understand how to set up the AAD environment variable please take a look at the follow [documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react).

> **Front-end** : 
> ```REACT_APP_CLIENT_ID``` 
> ```REACT_APP_TENANT_ID``` 
> ```REACT_APP_API_SCOPE```
> ```REACT_APP_BACKEND_ENDPOINT```

> **Back-end** :
> ```NODE_PORT```
> ```MONGO_CONNECTION_STRING_CLOUD```
> ```NODE_ENV```
> ```CLIENT_ID```
> ```TENANT_ID```
> ```CLIENT_ENDPOINT```

## Database
In this project I am using Mongodb database, in order to set up the database
you :
- Create a cloud-based database example on [MongoDB](https://www.mongodb.com/),
[Azure](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/introduction)...
- Install MongoDB locally on your machine [Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/)

After setting up the environment of the database retrieve the connection string
and set up the environment variable `MONGO_CONNECTION_STRING_CLOUD` for the `Back-End`. 


## Init
To start the application as a developer execute the following commands:
> **Front-end** :
>```bash 
> cd <folder_location>/thesis/front-end
> npm install
> npm run start 
>```
>[http://localhost:3000](http://localhost:3000)
> 
>**Back-end** :
>```bash 
> cd <folder_location>/thesis/back-end
> npm install
> npm run dev
>```
>
>[http://localhost:5000](http://localhost:3000)
## Production

# Front-end

# Back-end [:link:](/back-end)

# Database
