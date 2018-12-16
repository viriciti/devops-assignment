# ViriCiti DevOps Assignment
![](https://imgs.xkcd.com/comics/tools.png)

## Introduction
This repository holds the ViriCiti DevOps assignment. In this project you will find three folders that each hold a separate microservice.

The following picture depicts them and shows the corresponding dataflow:

![](https://github.com/viriciti/devops-assignment/raw/master/framework.png)

The services are:
* (from this repo) [`broadcaster`](https://github.com/viriciti/devops-assignment/blob/master/broadcaster): a process per driving bus, using each its own env variable `BUS_NAME=some-buse-name-xyz` per bus and publishing its vehicle parameters on `nats`
* (from this repo) [`logger`](https://github.com/viriciti/devops-assignment/blob/master/logger): just single instance, logging whatever is published on nats
* (from this repo) [`web-server`](https://github.com/viriciti/devops-assignment/blob/master/web-server): in replicated set-up, showing all vehicle parameters
* `mongodb`: in a replica set (https://www.mongodb.com)
* `nats`: in a cluster set-up (https://nats.io)

As can be seen, the connecting web browsers will connect over an AWS Application Load Balancer (ALB) wich will point to the internal nginx load balancer ([https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx)) for Kubernetes.

Finally, as you can see - for support of CI/CD - there is `gitlab`.

### MongoDB
The MongoDB server needs to be deployed as a ReplicaSet with one master and two secondary nodes to handle failover. It should also have an EBS (Elastic Block Storage) mount.

### NATS
To connect all applications a HA (High Availability) NATS cluster needs to be deployed. This service will connect the `broadcaster` with the `web-server` and `logger`, so you need to make sure that they are configured correctly.

### Logger
A single instance of logger can only be run in the cluster to prevent double message handling. Some monitoring could be created to allow for alerting if something in this data flow goes wrong. Example of metrics that's suitable for this process are: `number-of-incoming-message`, `number-of-saved-message`

### Web Server
Multiple Web Server replicas preferably in different machines should be deployed (take a look at kubernetes [`PodAntiAffinity`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)). The service will serve a HTML page with a `javascript` file that connect to a `WebSocket` server on the same `HTTP` server. Extra points if you can make this application scale in regard of connected websocket client. Example of metrics that would be suitable for this process are: `number-of-connected-client`, `number-of-page-request`

### Broadcaster
This application will simulate data generation from vehicles. You can run multiple of this application as long as they have a unique name, which can be configured via an environment variable called `BUS_NAME`. It will broadcast messages to `nats` on topic `vehicle.some_bus_name_xyz`. An example of possible metrics that could be suitable for this process is: `number-of-broadcasted-messages`

## The assignment
As a versatile devops engineer you have to deploy a Kubernetes cluster containing one master and three (or more) worker nodes. Those Kubernetes workers will be the place to deploy all services that are necessary for this assignment. Of course, all configuration is maintained centrally in a git repository on your github account (AND DO NOT COMMIT ANY SECRETS NOR PASSWORDS!).

We will provide you with a sandbox environment on AWS called `*.trials.viriciti.com` where you will be full admin, so you can go nuts.

As developers of these three beautiful services that are in this repo, of course, we need proper CI/CD!

### Pointers
- [ ] provision your cluster using `kops` (https://github.com/kubernetes/kops) using [this tutorial](https://github.com/kubernetes/kops/blob/master/docs/aws.md#testing-your-dns-setup). We have already created the DNS records pointing to Route 53, which you can test with: `dig ns trials.viriciti.com`
- [ ] use Helm Charts to configure and deploy all services (https://github.com/helm/charts)
- [ ] deploy `gitlab` using [the available Helm Chart](https://docs.gitlab.com/ee/install/kubernetes/gitlab_chart.html)
- [ ] set-up CI/CD using Gitlab
- [ ] Think of auto-scaling
- [ ] You can use Let's Encrypt to create the necasary certificates (https://letsencrypt.org/)

## Questions
If you have any questions about the assignment, the project setup or you're simply stuck, feel free to contact us at <a href='mailto:s.surur@viriciti.com'>s.surur@viriciti.com</a>. Please do not hesitate for this! You are also more then welcome to come by the office at any time. We're always ready to help. The idea is that something is created that you learn from and in the end can be proud of.

Finally, you will present your process, technical decisions and outcome to us. Looking forward to it!

Good luck with the assignment!
