FROM python:3.8.10
WORKDIR /usr/src/app
RUN pip install --upgrade pip 
COPY ./requirements.txt /usr/src/app
RUN pip install -r requirements.txt

COPY . /usr/src/app

EXPOSE 7000

CMD ["python", "manage.py", "runserver", "0.0.0.0:7000"]



