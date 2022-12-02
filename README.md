# Grid App

This application is a simplified grid management system.

Grid managers can register an energy resource (Wind, Hydroelectric, Solar, Gas, Coal, or Nuclear) and specify the maximum number of kW this facility can produce.

Once the resource is created, the manager can toggle whether the facility is online or offline, and the percentage of maximum wattage the facility is producing.


The app lists max output, current output, max carbon neutral output, and current carbon neutral output, and displays a pie chart of this data broken down by resource.

## Stack

### Client:
React
Redux (RTK-Query)
Typescript
SCSS
MUI

### Server:
Flask
SqlAlchemy
Postgres

## Running the Flask Server

1. Create a virtual environment
```
python3 -m venv venv
```

2. Activate the virtual environment
```
. venv/bin/activate
```

3. Install flask
```
pip3 install flask
```

4. Run the server
```
flask --debug run
```

## Running the React/Redux/Typescript client

1.  Make sure you are in the right directory
```
cd client
```

2.  Install dependencies
```
npm i
```

3. Start the node server
```
npm start
```

## Running client-side tests

TODO

## Running server-side tests

TODO

## Building with Docker

1. Build and tag the image
`docker build -t grid-app .`
2. You can run the image locally with
`docker run --env-file .env -p 5000:5000 grid-app`
(note port 5000 is used by Airplay on some macs, if so try 5001:5000)

# Deploying with AWS Elastic Beanstalk

1. Install the eb cli
2. Initialize the project: Navigate to the root directory and run `eb init -p docker grid-app`
3. Test it out by running `eb local run --port 5000` - You should see a database error since we haven't configured postgres
4. Create the environment - `eb create grid-app`
5. View the environment in your browser - `eb open`
6. Build and push the image to docker hub
`docker build -t <docker-id>/grid-app:latest .`
`docker push <docker-id>/grid-app:latest`

Finally, set the DB_URL environment variable to a valid RDS url in the EB console and make sure the RDS instance is configured to allow connection from to the app's associated EC2 instance.

TODO

- Write client side tests
- Write server side tests
