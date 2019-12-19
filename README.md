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

Database Schema

![Image description](https://github.com/nattaponaie/line-liff/blob/master/database-schema.png)

## How it works?

Step 0:
- Add LINE Official account id ```bash@439qrswz```

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

## Answer

1. Why you have chosen your selected programming language?
    - Top reason that I've chosen Javascript is because one language can do both frontend and backend. So, it could reduce a lot of development time.

      Moreover, there are some reasons why I've chosen NextJS SSR framework over other. Firstly, according to the requirements. It requires fast initial page load and NextJS SSR provide it. Secondly, NextJS framework provides a lot of built-in features such as Optimization, Router, etc. Therefore, it could save development time.



2. Are there any pros or cons to using this language over others?
  
   Pros:


     - Single language can do both frontend and backend.
     - Various package modules in community.
     - A lot of support in community, so any problem can be solved.
     - Easy to make interactive interface on frontend with Javascript.
     - A lot of frontend frameworks such as React, Vue, Angular, etc.
     - Less learning curve.

   Cons:


     - Javascript is not always suitable for every jobs.
     - Javscript is typeless but you can use Typescript.

3. Are you more comfortable with this language?
    - Yes, I am.

4. How about the database? Are there any advantages or disadvantages in your choice of database?
  
    - Firstly, the reason why I've chosed SQL over NoSQL because it is more efficient when there are a lot of schema relation. For example, according to the requirements, There are a lot of relation to define such as User has Order, Order has Product, Product has Price. Therefore, in the future, when application goes bigger the more complicated database relation to handle. This SQL (RDBMS) gives us a lot of benefits to manage database relation. Lastly, SQL database is vertically scalable. It means we can just add CPU, RAM to solve server load problem.

  
      Secondly, why not NoSQL? Firstly, NoSQL is horizontal scalability, this means we may to have add more service to handle more traffice. Secondly, NoSQL is not table-based. So, when the application goes bigger the large legacy to maintain. Meanwhile, NoSQL is more effective when the application is not that complex and not large.

5. How might you improve this system?
  
    Frontend
      - UX/UI
      - Optimization: Code splitting, Lazy load, Route based chunk, Minify plugins
      - Resize image, Lazy load image, Store image in CDN.

    
    Backend
      - Authentication, Authorization
      - Optimize Server Sent Event
      - Limit concurrent requests, to prevent brute-force attack by limitting consecutive failed attempts, Limit body request size.
      - Cover more unit test.
      - Cover integration test.
      - Use Helmet to secure headers
      - Add security eslints.
      - Apply CORS

6. Are there any design flaws? 
  
    - It should provide more product details on the screen such as name, price.
    - It should redirect to another page when user click "Select" button.

7. Are there any additional features that could be added to this system?
  
    - Product cart feature
    - Order product with quantity, additional note.
    - Mobile notification when order is served.
    - Authentication, Authorization
    - Product defails, comments, rating features.
    - User order panel feature.
    - Notification using LINE Chatbot.
    - Payment
