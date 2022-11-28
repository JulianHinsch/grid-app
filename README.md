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

## Deploying

1. Build the client
```
npm run build
```

TODO
