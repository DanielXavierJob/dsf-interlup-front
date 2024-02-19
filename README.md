# dsf-interlup-front

Welcome to the dsf-interlup-front repository! This repository contains the source code for the DSF Interlup FRONT project.

## Description

DSF Interlup FRONT is an interface aimed at managing tasks in the Kanban style, with it you can create tasks and organize them by columns

## Local Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/danielxavierjob/dsf-interlup-front.git
   ```

2. Install the project dependencies:

   ```bash
   cd dsf-interlup-front
   npm install
   ```

3. Set up the environment:

   - Create a `.env` file in the root directory.
   - Define the required environment variables in the `.env` file. Example:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Run the React application:

   ```bash
   npm start
   ```

6. Access the Project at `http://localhost:3000`.

## Docker Installation

To run this project with Docker, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/danielxavierjob/dsf-interlup-front.git
   ```

2. Navigate to the project folder:

   ```bash
   cd dsf-interlup-front
   ```

3. Set up the environment:

   - Create a `.env` file in the root directory.
   - Define the required environment variables in the `.env` file. Example:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Run the application with Docker:

   ```bash
   docker compose build
   docker compose up
   ```

5. Access the API endpoints at `http://localhost:3000`.

## Usage

When the application is online, create an account then log in, by default you will already have 3 columns with 1 example task in each, there you will see the options to create new columns, create new tasks, sort them and delete them easily


## Contributing

Contributions are welcome! If you have ideas for improvements, bug fixes, or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).