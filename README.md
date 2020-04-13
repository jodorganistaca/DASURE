# DASURE

Web page to visualize movies, series, books and exercise routines. In addition, you can participate in a forum.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Demo
![](https://i.imgur.com/O2i23my.png)

### Prerequisites

All the listed prerrequisites must be installed in order to use the application.

* [Node js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/)
* [Mongo DB](https://www.mongodb.com/download-center)
* [React](https://es.reactjs.org/)


### Installing

* Clone repository using git

```
git clone https://github.com/jodorganistaca/DASURE.git
```

* Install dependencies from package.json
```
yarn install
```

* Install dependencies from package.json in front (react)
```
cd front && yarn install
```

### Running the application
* Run the application in back
```
yarn start
```
* Run the application in front

```
cd front && yarn start
```

* The application uses Google OAuth 2.0 and therefore is required, inside a file named .env in root directory of the project,:

```
  GOOGLE_CLIENT_ID = <GOOGLE_CLIENT_ID>
  GOOGLE_CLIENT_SECRET = <GOOGLE_CLIENT_SECRET>
  MONGO_URI = <MONGO_URI of the MongoDB Atlas database.>
  JWT_SECRET = <JWT_SECRET: Secret key to encrypt the JSON Web Token if a user authenticates without Google OAuth>
```

## Built With

* [React](https://es.reactjs.org/) - Used for the front
* [Node js](https://nodejs.org/en/) - Used for the back
* [Mongo DB](https://www.mongodb.com/download-center) - Database for user and other collections like movies, series, books, exercise
* [Ant Design](https://ant.design/) - For some component in the UI
* [React-bootstrap](https://react-bootstrap.github.io/) - For some component in the UI
* [Pixabay](https://pixabay.com/es/) - API used for free pictures
* [OMDBAPI](http://www.omdbapi.com/) - API used for visualize movies



## Authors

* **José Daniel Organista Calderón** - [github](https://github.com/jodorganistaca)

* **Juan Sebastian Bravo Castelo** - [github](https://github.com/jsbravo-sw)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* The knowledge acquired 
