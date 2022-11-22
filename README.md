# Grid App

This application is a simplified grid management system.

Grid managers can register an energy resource (Wind Turbine, Hydroelectric Facility, Solar Facility, Gas Plant, Coal Plant, or Nuclear Plant) and specify the maximum number of MW this facility can produce.

Once the resource is created, the manager can toggle whether the facility is online or offline, and the percentage of maximum wattage the facility is producing.

The grid manager can also specify the peak demand the grid is meant to cover, and the percentage of peak demand that is expected.

The app will indicate whether or not this is being met.

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
cd client && npm test
```

## Running server-side tests

TODO

## Deploying

1. Build the client
```
npm run build
```

TODO




Stack:

React
Redux
Typescript
SCSS
MUI

Flask
SqlAlchemy
Postgres
