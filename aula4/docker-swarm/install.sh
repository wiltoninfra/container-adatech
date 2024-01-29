#!/bin/bash

sudo yum update
sudo yum upgrade -y
sudo yum install docker -y
sudo usermod -a -G docker ec2-user
sudo yum install python3-pip git -y
sudo pip3 install docker-compose
pip3 install --user docker-compose
sudo systemctl enable docker.service
sudo systemctl start docker.service
echo "Docker instalado com sucesso!"    

