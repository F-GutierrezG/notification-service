# !/bin/bash
ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} "docker login -u gitlab-ci-token -p $DOCKER_TOKEN registry.gitlab.com"

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker network create --subnet=172.23.0.0/16 notifications-service-network'

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker container stop notifications'
ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker container stop notifications-swagger'

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker container rm notifications'
ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker container rm notifications-swagger'

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker image rm $(docker images registry.gitlab.com/gusisoft/onelike/notifications-service/notifications-swagger -q)'
ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker image rm $(docker images registry.gitlab.com/gusisoft/onelike/notifications-service/notifications -q)'

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} "docker run -d --restart always -e 'API_URL=definitions/swagger.yml' --name notifications-swagger --network notifications-service-network --ip 172.23.0.4 $REGISTRY_REPO/$SWAGGER:$TAG"
ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} "docker run -d --restart always -e 'NODE_ENV=production' -e 'DATABASE_URL=postgres://$DATABASE_PROD_USER:$DATABASE_PROD_PASSWORD@$DATABASE_PROD_URL:$DATABASE_PROD_PORT/$DATABASE_PROD_NAME' --name notifications --network notifications-service-network --ip 172.23.0.2 $REGISTRY_REPO/$NOTIFICATIONS:$TAG"

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker network connect onelike-network --ip 172.18.0.12 notifications'
ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker network connect onelike-network --ip 172.18.0.13 notifications-swagger'

ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} 'docker container exec -i notifications bash -c "cd src && ../node_modules/.bin/sequelize db:migrate"'
