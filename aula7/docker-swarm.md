## Docker Swarm Commands

### Create a swarm
```bash
docker swarm init
```
 --advertise-addr

docker swarm join --token SWMTKN-1-5yjlbpbv1320ki2kxiadaussbej4f82xh6vslph8x7fvfqeigm-1pmzd452wfr8e8d
t9ykh4ujfz 192.168.0.28:2377

### Create a service
```bash
docker service create --name <service_name> <image_name>
```

### List services
```bash
docker service ls
```

### List tasks
```bash
docker service ps <service_name>
```

### List nodes
```bash
docker node ls
```

### Scale a service
```bash
docker service scale <service_name>=<number_of_replicas>
```

### Remove a service
```bash
docker service rm <service_name>
```

### View logs services
```bash
docker service logs <service_name>
```
### View Configs services
```bash
docker service inspect <service_name>
```


```

### Remove a node
```bash
docker node rm <node_name>
```

### Leave a swarm
```bash
docker swarm leave
```

### Remove a swarm
```bash
docker swarm leave --force
```

### Remove all services
```bash
docker service rm $(docker service ls -q)
```

### Remove all nodes
```bash
docker node rm $(docker node ls -q)
```
