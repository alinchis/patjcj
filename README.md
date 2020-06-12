## Development without docker
Start the project:
* `npm run serve` from the `client/` folder 
* `npm run start:dev` from the `server/` folder
  
Mount the remote folders:
The values for the `uid`/`gid` below are found with command `id <your_user>`
* mount the remote image folder locally:
  * `mkdir /tmp/images`
  * `sshfs -o nosuid,uid=1000,gid=1000 tudor@46.4.123.61:/srv/patjcj/images/ /tmp/images`
* mount the images folder into the `client/public/images` folder
  * `mkdir client/public/images`
  * `sudo mount --bind -o nosuid,uid=1000,gid=1000 /tmp/images client/public/images`



## Start the project for development
* `git clone https://gitlab.prforge.com/banca-mondiala/patjcj`
* `cd patjcj`
* `docker-compose -f docker-compose.yml -f docker-compose.dev.yml build`
* `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

## In order to have new npm packages installed in the docker images:
* `docker system prune -a -f` # to clear docker caches
* `docker network create traefik-public` # to recreate the traefik-public network
* `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -V`

## Notes
If docker complains that network traefik-public doesn't exist, create it with `docker network create traefik-public`

Images should be accessible at relative path `/images/CJ-II-a-A-07240/DSC_3408.jpg`

## APIs
Get the number of monuments by monument property, ex: 
- `http://localhost:8080/api/monuments.groups?prop=sector` 
- `http://localhost:8080/api/monuments.groups?prop=stare`
- `http://localhost:8080/api/monuments.groups?prop=tip_patrimoniu`