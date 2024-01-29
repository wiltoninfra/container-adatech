## Docker Machine in Amazon EC2

### Pré requisitos

- Virtual Box 
- Amazon Web Services

Amazon Web Services para pessoas que não conseguem utilizar o Virtual Box devido a restrições no computador, porem é preciso possui uma conta na AWS.

**Consulte a lista de drivers disponíveis**
https://docker-docs.uclv.cu/machine/drivers/


> O funcionamento é o mesmo para qualquer driver.

## Criando um docker machine

VirtualBox
```ssh
$ docker-machine create --driver virtualbox adatech
```
Amazon EC2
```ssh
$ docker-machine create --driver amazonec2 \
	--amazonec2-instance-type "t2.micro" \
	--amazonec2-region "us-east-1" \
	adatech
```

## Gerenciando docker machine
  
Verifique se o docker machine esta em execução

```ssh
$ docker-machine ls
NAME      ACTIVE   DRIVER      STATE     URL                       SWARM   DOCKER    ERRORS
adatech   -        amazonec2   Running   tcp://51.91.29.2:2376           v24.0.7  
```
Verificando informações adicionais do docker-machine
```ssh
$ docker-machine env adatech
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://51.91.29.2:2376 "
export DOCKER_CERT_PATH="/Users/wilton.guilherme/.docker/machine/machines/adatech"
export DOCKER_MACHINE_NAME="adatech"
# Run this command to configure your shell: 
# eval $(docker-machine env adatech)
```
Acessando ambiente com docker-machine instalado

Export as variaveis geradas no env acima primeiramente

```ssh
$ eval "$(docker-machine env adatech)"
```
> Saiba mais sobre comando `eval` https://man7.org/linux/man-pages/man1/eval.1p.html

> **Após acessar o ambiente do docker-machine os comandos docker e docker-compose funcionam da mesma forma.**
 
Verificar IP do host
```ssh
$ docker-machine ip adatech
```
Acessando o host com docker-machine remotamente
```ssh
$ docker-machine ssh adatech
```
Verificando detalhes do host com docker-machine
```ssh
$ docker-machine inspect adatech
```
Saindo do ambiente docker-machine
```ssh
$ eval $(docker-machine env -u)
```
Parando docker-machine
```ssh
$ docker-machine stop adatech
Stopping "adatech"...
Machine "adatech" was stopped.
```
Inicie novamente uma docker-machine
```ssh
$ docker-machine start adatech
```
Removendo docker-machine
```ssh
$ docker-machine rm adatech
```