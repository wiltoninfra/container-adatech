provider "aws" {
  region  = "us-east-1"
  profile = "default"
}

resource "aws_instance" "docker-machine" {
  count = 3
  ami             = "ami-0005e0cfe09cc9050" # arm ami-0730971bf8e0532d6
  instance_type   = "t3.small"
  security_groups = [aws_security_group.learning.id]
  subnet_id       = "subnet-04a4936d3b508674c"
  key_name        = "learning"
  user_data = <<EOF
#!/bin/bash
hostname "adatech-${count.index + 1}"
echo "adatech-${count.index + 1}" > /etc/hostname
EOF
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    Name   = "adatech-${count.index + 1}"
    Module = "containers"
  }
}

## Grupo de segurança Learning
resource "aws_security_group" "learning" {
  vpc_id      = "vpc-07e7bf9f6c7d526d0"
  name        = "sg_learning"
  description = "Security Group Create by terraform"
}

# Regras de entrada do grupo de segurança learning
resource "aws_security_group_rule" "entrada" {
  description       = "Regra de entrada"
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["177.81.74.168/32","163.116.233.49/32"]
  security_group_id = aws_security_group.learning.id
}

# Regras de saída do grupo de segurança learning
resource "aws_security_group_rule" "saida" {
  description       = "Regra de saida"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.learning.id
}
