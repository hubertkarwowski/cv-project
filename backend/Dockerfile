FROM python:3.13-alpine3.22

WORKDIR /app

COPY requirements.txt ./
COPY requirements-dev.txt ./

RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir -r requirements-dev.txt

COPY . .

CMD ["fastapi", "dev", "--host", "0.0.0.0"]