FROM python:3.10.4-buster
WORKDIR /app

COPY ./requirements.txt /app/
COPY ./*.py /app/
RUN pip install -r /app/requirements.txt

ENV FLASK_APP=sen-serv \
    FLASK_ENV=development \
    PYTHONPATH=/app/
EXPOSE 8501
CMD ["streamlit", "run", "/app/dashboard.py"]
