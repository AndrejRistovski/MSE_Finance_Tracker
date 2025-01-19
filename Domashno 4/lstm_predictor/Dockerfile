FROM environment
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . .

EXPOSE 8001
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]