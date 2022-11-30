# Set base image (host OS)
FROM python:3.8-alpine

# By default, listen on port 5000
EXPOSE 5000

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install psycopg2 dependencies
# See https://stackoverflow.com/a/60052478/7814846
RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev

# Install any dependencies
RUN pip3 install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

# Specify the command to run on container start
CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0" ]
