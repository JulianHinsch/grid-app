# Grid App

![grid-app screenshot](https://user-images.githubusercontent.com/24980176/205345373-d2a12b4a-dada-4998-90f7-1af0601c854f.png)

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

```
cd client
npm run test
```

## Running server-side tests

TODO

## Building with Docker

1. Build and tag the image
`docker build -t grid-app .`
2. You can run the image locally with
`docker run -p 5000:5000 grid-app`
(note port 5000 is used by Airplay on some macs, if so try 5001:5000)

## Deploying with AWS Elastic Beanstalk and AWS RDS

1. Install the eb cli
2. Initialize the project: Navigate to the root directory and run `eb init -p docker grid-app`
3. Test it out by running `eb local run --port 5000` - You should see a database error since we haven't configured postgres
4. Create the environment - `eb create grid-app`
5. View the environment in your browser - `eb open`
6. Build the image locally
`docker build -t <docker-id>/grid-app:latest .`
7. Make sure the `ENV` and `DB_URL` variables are set properly in the EB console
8. Create a Postgres instance in RDS and make sure it's configured to allow connection from to the app's associated EC2 instance.
9. Run `eb deploy` every time you wish to deploy a new version of the app

## Troubleshooting

If `psycopg2` does not install on your M1 mac / virtual environment:

Try `brew install openssl` and linking it when you install psycopg2 manually:

```
export LDFLAGS="-L/opt/homebrew/opt/openssl@1.1/lib"
export CPPFLAGS="-I/opt/homebrew/opt/openssl@1.1/include"
pip install psycopg2
```

TODO

- Finish client side tests
- Write server side tests
