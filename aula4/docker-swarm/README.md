## Docker swarm

O modo Swarm é um recurso avançado para gerenciar um cluster de daemons Docker.

### Destaques de recursos
Gerenciamento de cluster integrado ao Docker Engine
Use a CLI do Docker Engine para criar um enxame de Docker Engines onde você pode implantar serviços de aplicativos. Você não precisa de software de orquestração adicional para criar ou gerenciar um enxame.

### Design descentralizado
Em vez de lidar com a diferenciação entre funções de nós no tempo de implantação, o Docker Engine lida com qualquer especialização em tempo de execução. Você pode implantar ambos os tipos de nós, gerentes e trabalhadores, usando o Docker Engine. Isso significa que você pode construir um enxame inteiro a partir de uma única imagem de disco.

### Modelo de serviço declarativo
Docker Engine usa uma abordagem declarativa para permitir que você defina o estado desejado dos vários serviços em sua pilha de aplicativos. Por exemplo, você pode descrever um aplicativo composto por um serviço de front-end da Web com serviços de enfileiramento de mensagens e um back-end de banco de dados.

### Dimensionamento
Para cada serviço, você pode declarar o número de tarefas que deseja executar. Quando você aumenta ou diminui, o gerenciador de enxame se adapta automaticamente adicionando ou removendo tarefas para manter o estado desejado.

### Reconciliação de estado desejada
O nó gerenciador de enxame monitora constantemente o estado do cluster e reconcilia quaisquer diferenças entre o estado real e o estado desejado expresso. Por exemplo, se você configurar um serviço para executar 10 réplicas de um contêiner e uma máquina de trabalho que hospeda duas dessas réplicas travar, o gerenciador criará duas novas réplicas para substituir as réplicas que travaram. O gerenciador de enxame atribui as novas réplicas aos trabalhadores que estão em execução e disponíveis.

### Rede multi-host
Você pode especificar uma rede de sobreposição para seus serviços. O gerenciador de enxame atribui automaticamente endereços aos contêineres na rede de sobreposição quando inicializa ou atualiza o aplicativo.

### Descoberta de serviço
Os nós do gerenciador de enxame atribuem a cada serviço no enxame um nome DNS exclusivo e balanceiam a carga em execução de contêineres. Você pode consultar todos os contêineres em execução no enxame por meio de um servidor DNS incorporado no enxame.

### Balanceamento de carga
Você pode expor as portas dos serviços a um balanceador de carga externo. Internamente, o enxame permite especificar como distribuir contêineres de serviço entre nós.

### Seguro por padrão
Cada nó do enxame impõe autenticação mútua e criptografia TLS para proteger as comunicações entre ele e todos os outros nós. Você tem a opção de usar certificados raiz autoassinados ou certificados de uma CA raiz personalizada.

### Atualizações contínuas
No momento da implementação, você pode aplicar atualizações de serviço aos nós de forma incremental. O gerenciador de enxame permite controlar o atraso entre a implantação do serviço em diferentes conjuntos de nós. Se algo der errado, você poderá reverter para uma versão anterior do serviço.

>Documentação oficial https://docs.docker.com/engine/swarm/


Iniciando docker swarm
```ssh
$ docker swarm init
Swarm initialized: current node (k64qkgoaj288by8skkle7lh6n) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0sjaw3qbtltub0v0kzqqbj18382t53wahrfgznpbom33m9ykjr-7xhk91ubfpq8kmoaqzatbpo8j 172.31.87.226:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
Verifique os nodes do cluster
```ssh
$ docker node ls
ID                            HOSTNAME                        STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
6ywovj78mvgk3qcrcndtaclql     ip-172-31-86-243.ec2.internal   Ready     Active                          24.0.5
yckk8p8z9eurxnkvya2uvm1ba *   ip-172-31-89-79.ec2.internal    Ready     Active         Leader           24.0.5
```
Recrie o token para adicionar novos nodes
```ssh
$ docker swarm join-token manager
To add a manager to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0sjaw3qbtltub0v0kzqqbj18382t53wahrfgznpbom33m9ykjr-0c4w8t9jh1qx0a7jd8qocaiax 172.31.87.226:2377
```
Recrie o token para adicionar novos workers
```ssh
$ docker swarm join-token worker
To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0sjaw3qbtltub0v0kzqqbj18382t53wahrfgznpbom33m9ykjr-7xhk91ubfpq8kmoaqzatbpo8j 172.31.87.226:2377
```

Promovendo um node tipo worker para manager
```ssh
docker node promote ip-172-31-86-243.ec2.internal
```

Tranformar um node worker em manager
```ssh
$ docker node demote ip-172-31-86-243.ec2.internal
```

Remover um node do cluster 
> Para isso você precisa acessar o node que deseja remover
```ssh 
$ docker swarm leave
$ docker swarm leave --force
```
Remover um node
```ssh
$ docker node rm  ip-172-31-86-243.ec2.internal
```
## Criando serviços no docker swarm

Criando serviço web com imagem do nginx
```ssh
docker service create --name webserver --replicas 5 -p 8080:80 nginx
```
Listando serviços 
```ssh
docker service ls
```
```ssh
docker service ps webserver
```
```ssh
docker service inspect webserver
```

```ssh
docker service scale webserver=10
```

```ssh
docker service logs -f webserver
```

```ssh
docker service rm webserver
```

```ssh
docker service ls
```
```ssh
docker service create --name webserver --replicas 5 -p 8080:80 --mount type=volume,src=teste,dst=/app nginx
```