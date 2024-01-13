## Comandos mais usados no docker

`docker ls` ou `docker ps` - Lista os containers em execução

`docker ps -a` - Lista todos os containers

`docker run -ti ubuntu` - Cria um container e executa o bash

`docker run -d -p 80:80 nginx` - Cria um container e executa o nginx na porta 80

`docker stop <container id>` - Para o container

`docker rm <container id>` - Remove o container

`docker images` - Lista as imagens

`docker rmi <image id>` - Remove a imagem

`docker pull <image name>` - Baixa a imagem

`docker search <image name>` - Procura a imagem

`docker container attach <container id>` - Acessa o container

`docker inspect <container id>` - Mostra informações do container

`docker logs <container id>` - Mostra os logs do container

`docker exec -ti <container id> bash` - Acessa o bash do container

`docker exec -ti <container id> cat /etc/hosts` - Acessa o bash do container e mostra o arquivo hosts

`docker exec -ti <container id> cat /etc/resolv.conf` - Acessa o bash do container e mostra o arquivo resolv.conf

`docker exec -ti <container id> cat /etc/hostname` - Acessa o bash do container e mostra o arquivo hostname

`docker exec -ti <container id> cat /etc/issue` - Acessa o bash do container e mostra o arquivo issue

`docker exec -ti <container id> cat /etc/os-release` - Acessa o bash do container e mostra o arquivo os-release

`docker exec -ti <container id> cat /etc/*release` - Acessa o bash do container e mostra o arquivo *release

`docker exec -ti <container id> cat /etc/*version` - Acessa o bash do container e mostra o arquivo *version

`docker exec -ti <container id> cat /etc/*issue` - Acessa o bash do container e mostra o arquivo *issue

`docker exec -ti <container id> cat /etc/*` - Acessa o bash do container e mostra o arquivo *

`docker exec -ti <container id> cat /etc/*/*` - Acessa o bash do container e mostra o arquivo */*

`docker exec -ti <container id> cat /etc/*/*/*` - Acessa o bash do container e mostra o arquivo */*/*
`docker exec -ti <container id> cat /etc/*/*/*/*` - Acessa o bash do container e mostra o arquivo */*/*/*

### Removendo tudo dos containers

```sh 
docker system prune
docker system prune -a
```
### Removendo imagens

```sh
docker images -a
docker rmi Image Image
```
