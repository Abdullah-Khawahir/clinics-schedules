# dependencies
- postgres database with the following setup:
    * make database with this [database scheme](api/src/main/resources/schema.sql)
    * change the database `url` and `username` and `password` in  [application.properties](api/src/main/resources/application.properties)
- node.js
- java 17+
- lite-server

# running the application
## backend
- to run the backend navigate via command line to `api` folder and type this command:
```bash
    mvnw spring-boot:run
``` 

## frontend 
- put the correct data in the  [environment file](frontend/src/environments/environment.ts)
- to run the frontend navigate via command line to `frontend` folder and type this commands in order:
```bash 
    npm i
```
```bash
    npm build
```
```bash
    npm deploy
```

    
