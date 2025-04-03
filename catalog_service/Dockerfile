FROM python:3.11-slim

# setting working directory 
WORKDIR /app

# copy requirements.txt into app/
COPY requirements.txt .

# installing the dependencies
RUN pip install --no-cache-dir -r requirements.txt
# copy the content of the local src directory to the working directory
COPY . .
# initialize, migrate and upgrade database
RUN python -m flask db init
RUN python -m flask db migrate
RUN python -m flask db upgrade

# expose the port 5000
EXPOSE 5000
# run the command to start the development server
CMD ["python", "app.py"]