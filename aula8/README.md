## Docker swarm continue

## Secrets

Help do comando
```ssh
$ docker secret --help

Usage:  docker secret COMMAND

Manage Swarm secrets

Commands:
  create      Create a secret from a file or STDIN as content
  inspect     Display detailed information on one or more secrets
  ls          List secrets
  rm          Remove one or more secrets

Run 'docker secret COMMAND --help' for more information on a command.
```

> **Entrada Padrão (stdin)** é a entrada de um fluxo de texto. Pode ser representado pelo número 0.

> **Saída Padrão (stdout)** é a saída de um fluxo de texto em condições normais. Como exemplos temos o monitor, a impressora, um arquivo... Pode ser representado pelo número 1.

> **Saída de Erro (stderr)** é a saída de um fluxo de texto em condições de erro ou insucesso em um determinado processamento. Pode ser representado pelo número 2.


## Criando uma nova secret STDIN
```ssh 
$ echo 'adatech-secret' | docker secret create ada-secret -
```

## Criando uma nova secret com base em arquivo
```ssh 
$ echo 'adatech-pass' | docker secret create ada-pass.txt -
```

## Inpecionando uma secret
```ssh 
$ docker secret inspect <secret_name>
```

## Listando secrets
```ssh 
$ docker secret ls
```

## Criando um service no swarm e adiocionando a secret
```ssh 
$ docker service create --name webserver --detach=false --secret <secret name> <container_image>
```
**Obs:**
> -d, --detach= false Executa o contêiner em segundo plano e imprime o ID do contêiner
> -d, --detach= true Executa o contêiner em segundo plano e imprime o ID do contêiner

## Deletar secret
```ssh 
$ docker secret rm <secret name>
```

## Autlizando service no Dockerswarm
```ssh 
$ docker service update --secret-rm <secret name old> --detach=false --secret-add source=<secret new>,target=password app
```

## Deploy de uma stack no Swarm
```ssh
$ docker stack deploy -c <nome do arquivo docker-compose> <nome da stack>
```

## Listar stacks
```ssh
$ docker stack ls
$ docker stack services <nome da stack>
```
## Listar remover stack
```ssh
$ docker stack rm <nome da stack>
```




