![Logo of the project](https://github.com/nattaponaie/line-liff/blob/master/public/static/line-logo.svg)
# LINE LIFF Challenge

This is a LINE LIFF application that has been implemeted with NextJS.

There are some endpoint that uses Server Sent Event methodology.



## Prerequisite

```bash
Docker
Docker Compose
Heroku (optional)
```



## Installation

Use the Docker Compose to install this project.

```bash
docker-compose build line-liff
docker-compose up line-liff
```

Heroku deployment (optional)

```bash
heroku login
git push heroku master

PGUSER=api PGPASSWORD=api heroku pg:push postgres://localhost/line-liff DATABASE_URL --app line-liff-challenge
```



## Database

A database will be running when moberries-api container is up.

Or you want to run database separately, please remove the following line out from docker-compose file
```bash
depends_on: 
   - line-liff-postgres
```

Configurations (docker-compose.yml)
```bash
DATABASE_HOST: "line-liff-postgres"
DATABASE_NAME: "line-liff"
DATABASE_USERNAME: "api"
DATABASE_PASSWORD: "api"
```

*NOTE*

Database migration and seeder are executed automatically when container is up.
But if it failed you could run ```yarn db:migrate, yarn db:seed:all``` outside Docker


Database Schema

![Image description](https://github.com/nattaponaie/line-liff/blob/master/database-schema.png)



## How it works?

Step 0:
- Add LINE Official account id ```@439qrswz```

OR

![Image description](https://github.com/nattaponaie/line-liff/blob/master/channel-qr-code.png)

Step 1:
- Visit LINE Channel OR https://line-liff-challenge.herokuapp.com/
- [API]: User will be created with lineUserId and displayName.

  [LOCAL]: Cannot login with LINE so it will use a mock lineUserId instead from .env

Step 2:
- Click "Select" to order product.
- There will be "Order has been sent successfully!"
- [API]: The order will be created.
- Do not close the window.

Step 3:
- Visit https://line-liff-challenge.herokuapp.com/admin in another external browser.
- [API]: Any incoming orders will be automatically displayed from backend without refreshing.

Step 4:
- On admin page, update status order to "Served"
- [API]: Status will be updated as "Served".

Step 5:
- Look at the LINE browser, there will be a message sent to chat room.
- [API]: Status will be updated as "Received"

Step 6:
- Look at the admin tab, the order status will be changed to "Received" without refreshing page.



## API Documentation

https://documenter.getpostman.com/view/3924263/SWEDyEEB?version=latest



## Unit Testing

```bash
docker-compose up unit-test
```
