# Docker comandos básicos

Baixar uma imagem docker
```ssh
$ docker pull image-name
```
Listar containers
```ssh
$ docker ps
$ docker ps --all 
```

Lista imagens containers locais
```ssh
$ docker images
$ docker images --all
```

Criar um container
```ssh
$ docker create -ti ubuntu
```
Iniciar um container
```ssh
$ docker start <container id>
```
Acessa um container recem criado 
```ssh
$ docker attach <container id>
```

Parando um container
```ssh
$ docker stop <container id>
```
Restartando um container
```ssh
$ docker restart <container id>
```
Pausar um container
```ssh
$ docker container pause <container id>
```
Despausar um container
```ssh
$ docker container unpause <container id>
```
Verificando uso de recursos dos containera
```ssh
$ docker stats
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O   PIDS
bad1631b74d4   magical_black   0.00%     828KiB / 7.661GiB   0.01%     1.02kB / 0B   0B / 0B     1
```
Verificando logs do container
```ssh
$ docker logs <container id>
$ docker logs -f <container id>
```
Removendo container
```ssh
$ docker rm <container id>
```
Especificando tamanho de memória para container
```ssh
$ docker run -ti -m 512M --name container_name ubuntu
```
Especificando tamanho de cpu para container
```ssh
$ docker run --cpus=0.5 --name container_name apache
```
Atualizando tamanho da cpu e memória do container
```ssh
$ docker update -m 256m --cpus=1 container_name
```
Ver detalhes do container
```ssh
$ docker inspect <container id>
```