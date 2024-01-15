
# Docker comandos básicos

### Pré requisitos
- Comandos básicos linux
- Sistemas operacionais
  
> Documentação oficial do docker com todas as linhas de comandos seus argumentos e parâmetros
https://docs.docker.com/engine/reference/commandline/docker/

Baixar uma imagem docker
```ssh
$ docker pull <image name>
```
Procurar imagem no docker hub
```ssh
$ docker search <image name>
```
Ver histórico de alterações de ima imagem
```ssh 
$ docker history <image name>
```
Enviar imagem para o docker hub
```ssh
docker push <image name>
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
$ docker pause <container id>
```
Despausar um container
```ssh
$ docker unpause <container id>
```
Verificando uso de recursos dos containera
```ssh
$ docker stats
CONTAINER ID NAME CPU % MEM USAGE / LIMIT MEM % NET I/O BLOCK I/O PIDS
bad1631b74d4 magical_black 0.00% 828KiB / 7.661GiB 0.01% 1.02kB / 0B 0B / 0B 1
```
Verificando logs do container
```ssh
$ docker logs <container id>
$ docker logs -f <container id>
```
Acessando o bash do container iniciado
```ssh
$ docker exec -ti <container id>
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
Removendo uma imagem do host local
```ssh
$ docker rmi <image name>
$ docker rmi $(docker images -a -q) ## Remove todas as imagens
```
Parar todos os containers
```ssh
$ docker stop $(docker ps -a -q)
```
Remover todos os containers
```ssh
$ docker rm $(docker ps -a -q)
```
Listar volumes docker
```ssh
$ docker volume ls
```
Criar um novo volume docker tmpfs
```ssh
$ docker volume create my-volume-name
```
Iniciar um container com volume do tipo tmpfs
```ssh
$ docker run -ti -v my-volume-name:/app ubuntu bash
```
Iniciar um container com volume do tipo bind
```ssh
$ docker run -ti -v /home/username/myfolder:/app ubuntu bash
```
### Dockerfile

Primeiro Dockerfile
```yaml
## File name is Dockerfile
FROM ubuntu
RUN /bin/echo "HELLO DOCKER"
```
Realizando build de uma imagem docker apartir do `Dockerfile`
```ssh
$ docker build -t userDockerHub/ubuntu:MYTAG
```
> Saiba mais sobre as tags na documentação oficial https://docs.docker.com/engine/reference/commandline/tag

Enviando imagem para dockerhub
```ssh
$ docker push userDockerHub/ubuntu:MYTAG
```
### Opções disponíveis para criar um Dockerfile
```
ADD -- Copia novos arquivos, diretórios, arquivos TAR ou arquivos remotos e os adiciona ao filesystem do container.

CMD -- Executa um comando. Diferentemente do RUN, que executa o comando no momento em que está "buildando" a imagem, o CMD irá fazê-lo somente quando o container é iniciado.

LABEL -- Adiciona metadados à imagem, como versão, descrição e fabricante.

COPY -- Copia novos arquivos e diretórios e os adiciona ao filesystem do container.

ENTRYPOINT -- Permite que você configure um container para rodar um executável. Quando esse executável for finalizado, o container também será.

ENV -- Informa variáveis de ambiente ao container.

EXPOSE -- Informa qual porta o container estará ouvindo.

FROM -- Indica qual imagem será utilizada como base. Ela precisa ser a primeira linha do dockerfile.

MAINTAINER -- Autor da imagem.

RUN -- Executa qualquer comando em uma nova camada no topo da imagem e "commita" as alterações. Essas alterações você poderá utilizar nas próximas instruções de seu dockerfile.

USER -- Determina qual usuário será utilizado na imagem. Por default é o root.

VOLUME -- Permite a criação de um ponto de montagem no container.

WORKDIR -- Responsável por mudar do diretório "/" (raiz) para o especificado nele.
```