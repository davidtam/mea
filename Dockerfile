FROM python:3.10.4-alpine3.15
WORKDIR /app

COPY ./requirements.txt /app/
COPY ./*.py /app/
RUN pip install -r /app/requirements.txt && \
    python /app/nltk_downloader.py
ENV FLASK_APP=sen-serv \
    FLASK_ENV=development \
    PYTHONPATH=/app/
cmd ["flask", "run"]
EXPOSE 5000
