#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z notifications-db 5432; do
  sleep 0.1
done

sleep 1

echo "PostgreSQL started"

cd src && ../node_modules/.bin/sequelize db:migrate

npm start
