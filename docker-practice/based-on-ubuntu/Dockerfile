FROM ubuntu:16.04
Maintainer Viet Le <vietlq85@gmail.com>

# System-wide changes
RUN apt-get -yqq update
RUN apt-get -yqq upgrade
RUN apt-get -yqq install python-pip python-dev
RUN apt-get -yqq install nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Copy application code & change work dir
ADD FoodTrucks/flask-app /opt/flask-app
WORKDIR /opt/flask-app

# Fetch specific dependencies
RUN npm install
RUN npm run build
RUN pip install -r requirements.txt

# Export port
EXPOSE 5000

# Start app
CMD ["python", "./app.py"]
