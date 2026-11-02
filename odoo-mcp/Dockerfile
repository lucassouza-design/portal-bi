FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY odoo_client.py server.py ./
ENV PORT=8000
CMD ["python", "server.py"]
