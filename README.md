# Home Library Service

## Downloading

```
git clone https://github.com/rlexus90/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

 ### 1 Download image 
 ```
 docker pull rlexus90/home-library
 ```
 ### 2 Create database using script
 ```
 npm run create:db
 or
 sudo npm run create:db
 ```
 ### 3 Add prisma migration use 
 ```
 npm run migrate
 ```
 ### 4 Run both image

 ## You cant create docker containers

### Create light version  
```
npm run docker:prod
or sudo npm run docker:prod
```
after run (only first time, or after delete volumes)
``` 
npm run migrate
```

### Create develop version (after change code in 'src' folder app automatically reload with changes)
```
npm run docker:dev
or sudo npm run docker:prod
```
after run (only first time, or after delete volumes)
``` 
npm run migrate
```
PS if you use MackOS with chip M1 app can be crashed
[InfoLink](https://github.com/nodejs/docker-node/issues/1946)
(before all work correct 🤷)

##  Vulnerabilities scanning 
```
npm run docker:scan
```
all vulnerabilities fixed.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

