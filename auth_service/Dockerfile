FROM python:3.11-slim

# setting working directory 
WORKDIR /app

# copy requirements.txt into app/
COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# copy all files into app/
COPY . .

# migrate and upgrade database with django commands
RUN python manage.py migrate

# expose the port 8000
EXPOSE 8000
# run the command to start the development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]