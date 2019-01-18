# !/bin/bash
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker login -u gitlab-ci-token -p $DOCKER_TOKEN registry.gitlab.com"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network create --subnet=172.23.0.0/16 notifications-service-network'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container stop notifications'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container stop notifications-db'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container stop notifications-swagger'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container rm notifications'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container rm notifications-db'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container rm notifications-swagger'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker image rm $(docker images registry.gitlab.com/gusisoft/onelike/notifications-service/notifications-swagger -q)'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker image rm $(docker images registry.gitlab.com/gusisoft/onelike/notifications-service/notifications-db -q)'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker image rm $(docker images registry.gitlab.com/gusisoft/onelike/notifications-service/notifications -q)'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker run -d --restart always -e 'POSTGRES_USER=postgres' -e 'POSTGRES_PASSWORD=postgres' -p 5436:5432 --name notifications-db --network notifications-service-network --ip 172.23.0.3 $REGISTRY_REPO/$NOTIFICATIONS_DB:$TAG"
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker run -d --restart always -e 'API_URL=definitions/swagger.yml' --name notifications-swagger --network notifications-service-network --ip 172.23.0.4 $REGISTRY_REPO/$SWAGGER:$TAG"
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker run -d --restart always -e 'NODE_ENV=development' -e 'DATABASE_URL=postgres://postgres:postgres@notifications-db:5432/notifications' --name notifications --network notifications-service-network --ip 172.23.0.2 $REGISTRY_REPO/$NOTIFICATIONS:$TAG"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network connect onelike-network --ip 172.18.0.12 notifications'
ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network connect onelike-network --ip 172.18.0.13 notifications-swagger'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container exec -i notifications bash -c "cd src && ../node_modules/.bin/sequelize db:migrate"'
