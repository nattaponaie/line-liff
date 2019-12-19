# entrypoint.sh

yarn install
yarn db:migrate
yarn db:seed:all
yarn dev