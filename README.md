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

    
# Schedule Management Application

---

### System Architecture 

This system is divided into 3 parts and each part is designed to be independent
from each other.  I tried to apply the separation of concerns concept to limit
the dependencies and make it easier to replace on these parts if needed with
least concern of what might break. Dividing the system in three major services
came with a price of boilerplate code and hard debugging challenges.However
dividing the project to 3 independent units makes each service request events
be handled by the operating system which is a free win.

#### The database

##### 	DBMS choice

I selected postgreSQL as my DBMS because of the wide support and its feature
reach and JSON support. And I did not know this DBMS so I decided to learn it
on the project. 

##### 	Database design 

As for the database it is composed of  6 **entity tables** and 3
**collection tables**: User table used for authentication and
authorization.Employee , Hospital , Building , Clinic and Clinic Schedule
are management entity tables.**Look at figure 1**.

| *figure 1 database design.* |
| :---- |

#### The back-end

On the back-end I used the Java Spring boot framework to expose HTTP RESTful
Controllers. So I can request the needed objects. 

##### 	Data Layer

Implementing a data access layer for an application can be quite cumbersome. so
I used JPA to handle this part of the program. 

##### 	Service Layer

Usually debugging is hard and testing is even harder. So I used this layer to
perform the business logic and throw errors if needed and so on.

##### 	Controller Layer

The Controller layer Responsibility is to validate data and check them then map
the Entities that came from the service to DAO \-data access object- to send it
via network

##### The API design 

All controllers were designed to behave similarly to make integration with the
front-end as smooth as possible and to be controlled by one unit. this way the
module is going to be implemented to be   decoupled and satisfies the single
responsibility design rule.  **Look at figure 2**.

###### 	

| *![][image1]figure 2 entity controller* |
| :---- |

###### 

##### 	Authentication and Authorization 

The authentication layer is handled by Spring Security library by filter
chaining the HTTP request and if it passes all levels of the chain it will be
processed otherwise it will return an unauthorized http response code. Basic
authentication is the opted method, because it is easy to implement and to
understand.

| ![][image2] *figure 3 example of basic http authentication* |
| :---- |

###### 

From figure 3 you can see the authentication header in the request. This header
will be parsed by the authentication filter and checked if the username and the
password are correct with the user from the database. **ali:123** should be
encrypted for security reasons.

#### The Frontend

In the front-end I used Angular framework.There are few reasons which made me
opt for this framework.First, Angular CLI is command line tool to automate some
repetitive tasks and saves me to write less code which provides a great
developer experience.Second, angular integrate well with TypeScript.Third,
modular architecture is enforced by nature in the framework which makes the
code base more readable and maintainable if not overused.

##### 	Website Map

The website is basically composed of five pages which are schedules, login,
dashboard, panels,  add/edit form. Forms are for data addition and editing.
Panels are for data presentation. Therefore the content of each component
differs based on the entity that relates to the component. As example take the
**Add Hospital form** and the **add user form** both will show similar
interface yet the content is different. This makes it easy for the user to
perceive the functionality according to the visual design. **Look at the next
diagram**.  
 

| ![][image3] *figure 4 website map* |
| :---- |

##### 	Website Pages

From the last figure you can see all different pages of the website. Each page
is composed out of two or three components \-components are stateless or
stateful visual sections in a page-. First component is the navigation bar on
top of the webpage. Then the second component is the content of the webpage
which differs based on the URL. Last component is the popup component for the
add/edit forms and the notifier popup.

##### 	Components

| components ├── data-table ├── error ├── loading ├── navbar ├──notification-view └── popup-form | forms ├── building-form ├── clinic-form ├── clinic-week-schedules-form ├── employee-form ├── hospital-form ├── schedule-form └── user-form | pages ├── authorized  |   ├── buildings-panel  |   ├── clinics-panel  |   ├── dashboard  |   ├── employees-panel  |   ├── hospital-panel  |   ├── schedules-panel  |   └── users-panel └── public 	├── auth 	 |   └── login  	├── home 	└── hospital-schedules |
| :---- | :---- | :---- |

###### *table 1 tree of folders in project*

The previous columns are an output of tree command from the actual file tree
structure of the project.If we look at the **component** tree we can see a
**popup-form** component. This component is used to build all other components
in the folder **forms**. And the **data-table** component is used to construct
all panel components which are suffixed with **\-panel.** For better
demonstration Look at the next diagram which will demonstrate the life of the
**Hospital-panel page** which is composed of nav-bar , **loading** , **error**
, **data-table** components .

| ![][image4] *figure 5  component display logic* |
| :---- |

This is a common pattern for view programming and it can be abstracted further
to not violate the DRY principle \-DRY stands for Don't Repeat Yourself-.   

##### 	Services

In Angular, services are single shared instances of that class and it is
accessed by injecting the service into any class that calls for it. Services
are good to use for data transfer , application state store and global state
handlers. In the project I had three services which I will describe their
functionality one at a time.

###### 1. API Service:

This service is Poorly named. It handles the data communication between the API
server and the browser.

###### 2. User Service: 

This service handles the authentication and authorization of users and it saves
the user information.

###### 3. Notifier Service:

This service is a backend for **notification-view.** This service controls a
global component and if it fires a notification it will show a popup of the
notification and its content.

##### 	

##### Visual Design

| ![][image5] *figure 6 schedules page Home Page* |
| :---- |
| ![][image6] *figure 7 dashboard page* |
| ![][image7] *figure 8 add Hospital form* |
| ![][image8] *figure 9 Hospitals Panel Page*  |
| ![][image9] *figure 10 Edit Hospital Form* |

	  
	

##### 	Color Choice 

You can see from the **figures 6 to10** there is not much coloring in the UI
and I was mainly aiming to use black and white for the project until I was
surprised after implementing the CSS in how bad and boring that looked. and it
was Hard to recognize the text. so I added blue and dark blue for the
clickables. if you look at **figure 6** you can see the dark blue used for
toggle buttons.

In color theory the black and white colors are natural colors which can be used
with any other colors.  Now the challenge is what colors can be used together.
After much trying and plug and play I realized that color choice is a weakness
on my part. While browsing around on the internet I saw that all buttons of the
same kind have the same color which is usually blue so I chose blue and it
turned out to be a suitable color.

| ![][image10] *figure 11 color palette* |
| :---- |

# 

[image1]: <images/contoller.jpg>

[image2]: <images/http.jpg>

[image3]: <images/map.jpg>

[image4]: <images/page-loadding.jpg>

[image5]: <images/sched.png>

[image6]: <images/dashboard.png>

[image7]: <images/H-add.png>

[image8]: <images/H-list.png>

[image9]: <images/H-edit.png>

[image10]: <images/colors.png>
