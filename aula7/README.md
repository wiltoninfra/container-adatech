## Exercício de fixação

Subir as imagens

- frontend
- backend-api
- worker

Para um registry externo dockerhub ou similar

### Comandos

#### Build image
```ssh
$ docker build -t <nome_da_imagem> .
```
#### Set tag in image
```ssh
$ docker tag <nome_da_imagem>:<tag> <nome_do_registry>/<nome_da_imagem>:<tag>
```
#### Push image
```ssh
$ docker push <nome_do_registry>/<nome_da_imagem>:<tag>
```
#### Pull image
```ssh
$ docker pull <nome_do_registry>/<nome_da_imagem>:<tag>
```
#### Run image
```ssh
$ docker run -d -p <porta>:<porta> <nome_do_registry>/<nome_da_imagem>:<tag>
```
#### Run image with environment variables
```ssh
$ docker run -d -p <porta>:<porta> -e <VARIAVEL>=<VALOR> <nome_do_registry>/<nome_da_imagem>:<tag>
```

> **Observação**: Quando enviamos imagens para o dockerhub não é necessário passar um nome de registry.


### Outros registry conhecidos

- [AWS ECR](https://aws.amazon.com/pt/ecr/)
- [Google Container Registry](https://cloud.google.com/container-registry)
- [Azure Container Registry](https://azure.microsoft.com/pt-br/services/container-registry/)
- [Quay](https://quay.io/)
- [Gitlab](https://docs.gitlab.com/ee/user/packages/container_registry/)
- [Github](
https://docs.github.com/pt/packages/guides/about-github-container-registry)
