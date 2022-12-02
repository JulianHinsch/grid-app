# Build step #1: build the React front end
FROM node:16-alpine as node-build
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY ./client/package.json ./
COPY ./client/tsconfig.json ./
COPY ./client/src ./src
COPY ./client/public ./public
RUN npm install
RUN npm run build

# Build step #2: build the API with the client as static files
FROM python:3.8-alpine AS python-build
WORKDIR /app
COPY --from=node-build ./client/build ./client/build

COPY requirements.txt .

# Install psycopg2 dependencies
# See https://stackoverflow.com/a/60052478/7814846
RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev

# Install any dependencies
RUN pip3 install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

# By default, listen on port 5000
EXPOSE 5000

# Specify the command to run on container start
CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0" ]
