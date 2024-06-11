# Project Compacine :popcorn:🎥

Compacine is a cinema management API that allows for the creation and management of movies, cinema sessions, and tickets.

Developed by [Bernardo Batistelli](https://github.com/bernardobatistelli), [Jordana Fabro](https://github.com/JordanaFabro), [Leornado Follador](https://github.com/LeonardoFollador), [Nathan Weirich](https://github.com/NathanWeirich), [Rafael Gonzatto](https://github.com/RafGonzatto), [Talia Mendes](https://github.com/TaliaMendes)

## Description

Compacine is a backend application developed with Node.js and TypeScript. It uses SQLite as the database and includes an API documented with Swagger. The application provides functionality to:

- Manage movies
- Manage cinema sessions
- Manage sessions tickets

## Technologies Used

### Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows the application to handle multiple tasks concurrently, making it ideal for building fast and scalable network applications.

### TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It provides static typing and type checking, which helps in catching errors early during the development process.

### Express

Express is a fast, unopinionated, minimalist web framework for Node.js. It is used to create the server and handle routing in the application.

### SQLite

SQLite is a lightweight, disk-based database that doesn’t require a separate server process. It is used as the database for storing information about movies, cinema sessions, and reservations.

### TypeORM

TypeORM is an ORM (Object-Relational Mapper) for TypeScript and JavaScript. It helps in managing database operations using an object-oriented approach.

### Tsyringe

Tsyringe is a dependency injection library for TypeScript. It is used to manage and inject dependencies, improving code modularity and testability.

### Swagger

Swagger is a set of open-source tools for designing, building, documenting, and consuming REST APIs. Swagger UI and Swagger JSDoc are used to generate and serve API documentation.

### Zod

Zod is a TypeScript-first schema declaration and validation library. It is used to validate incoming data, ensuring the correctness and security of the application.

### Date-fns

Date-fns is a modern JavaScript date utility library. It provides comprehensive, yet simple, functions to handle date and time manipulations.

### Jest

Jest is a delightful JavaScript testing framework with a focus on simplicity. It is used for writing and running tests to ensure the reliability and correctness of the application.

### ESLint

ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript/TypeScript code. It helps maintain code quality and consistency.

### Prettier

Prettier is an opinionated code formatter. It enforces a consistent style by parsing code and re-printing it with its own rules.

### Dotenv

Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. It is used to manage configuration settings.

### Cors

Cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing) with various options.

### Nodemon

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. It is used during development to improve productivity.

## Installation

To get started with the Compacine project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/compacine.git
    ```

2. Install dependencies:
    ```sh
    cd compacine
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and configure the necessary environment variables.

4. Compile the application:
    ```sh
    npm run build
    ```
5. Execute the migrations:
    ```sh
    npm run migrations
    ```
6. Run the application:
    ```sh
    npm run dev
    ```

## Usage

Once the application is running, you can access the API documentation at `http://localhost:3000/api-docs`.


### Movies

- **List all movies**
  ```http
  GET /api/v1/movies
  
  Returns a list of all movies, with all relations, sessions, and sessions tickets.

- **Create a new movie**
  ```http
  POST /api/v1/movies

  Request body example:
  {
   "image": "https://www.example.com/image.jpg",
   "name": "Movie Name",
   "description": "Movie description",
   "actors": ["Actor 1", "Actor 2"],
   "genre": "Action",
   "release_date": "2024-05-20"
   }
- **Update a movie by id**
  ```http
  PUT /api/v1/movies/{id}

  Request body example:
  {
   "image": "https://www.example.com/image.jpg",
   "name": "Updated Movie Name",
   "description": "Updated movie description",
   "actors": ["Actor 1", "Actor 2"],
   "genre": "Action",
   "release_date": "2024-05-20"
   }
- **Get a movie by id**
  ```http
   GET /api/v1/movies/{id}
- **Delete a movie by id**
  ```http
   DELETE /api/v1/movies/{id}
### Sessions

- **Create a new session**
  ```http
  POST /api/v1/movies/{movie_id}/sessions

  Request body example:
  {
   "room": "room 1",
   "capacity": 150,
   "day": "2024-10-23",
   "time": "19:20:00"
   }
- **Edit a session**
  ```http
  PUT /api/v1/movies/{movie_id}/sessions/{id}

  Request body example:
  {
   "room": "room 1",
   "capacity": 150,
   "day": "2024-06-07",
   "time": "20:00:00"
  }
- **Delete a session**
  ```http
  DELETE /api/v1/movies/{movie_id}/sessions/{id}

  Request body example:
  {
   "room": "room 1",
   "capacity": 150,
   "day": "2024-06-07",
   "time": "20:00:00"
  }
### Tickets

- **Create a new ticket**
  ```http
  POST /api/v1/movies/{movie_id}/sessions/{session_id}/tickets

  Request body example:
  {
  "chair": "b1",
  "value": 10
  }
- **Update a ticket**
  ```http
  PUT /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/{id}

  {
  "chair": "b1",
  "value": 10
  }
- **Delete a ticket**
  ```http
  DELETE /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/{id}

### Running Tests

This application includes a comprehensive suite of endpoint tests written using Jest and supertest. To run the tests:

1. **Create Migrations**: Ensure that your database schema is set up correctly.

    ```bash
    npm run migrations
    ```

2. **Initialize the Server**: Start the application server in a terminal using the appropriate command.

    ```bash
    npm run dev
    ```

3. **Run Tests**: Open another terminal window and execute the following command to run the test suite.

    ```bash
    npm run test
    ```

    This command will execute all the tests in the suite, interacting with the running server to validate the functionality of the endpoints.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
