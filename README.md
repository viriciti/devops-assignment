# ViriCiti DevOps Assignment
![](https://imgs.xkcd.com/comics/tools.png)

## Introduction
This repository holds the ViriCiti DevOps assignment. In this project you will find three folders that each hold a seperate microservice.

The following picture depicts them and shows the correspoding dataflow:

![](https://github.com/viriciti/devops-assignment/raw/master/framework.png)

The services are:
* `mongodb`: in a replica set (https://www.mongodb.com)
* `nats`: in a cluster set-up (https://nats.io/)
* (from this repo) [`logger`](https://github.com/viriciti/devops-assignment/blob/master/logger): just single instance
* (from this repo) [`broadcaster`](https://github.com/viriciti/devops-assignment/blob/master/broadcaster): a process per drivng bus, using each its own env variable `BUS_NAME=some-buse-name-xyz` per bus 
* (from this repo) [`web-server`](https://github.com/viriciti/devops-assignment/blob/master/web-server): in replicated set-up
As can be seen, the connecting browsers will connect over an AWS Application Load Balancer (ALB) wich will point to the internal nginx load balancer for Kubernetes. 

Finally, as you can see - in support of CI/CD - there is `gitlab`.

### MongoDB
The MongoDB server needs to be deployed as a ReplicaSet with one master and two secondary nodes to handle failover. It should also have an EBS (Elastic Block Storage) mount. 

### NATS
To connect all applications a HA (High Availability) NATS cluster needs to be deployed. This service will connect the `broadcaster` with the `web-server` and `logger`, so you need to make sure that they are configured correctly.

### Logger
A single instance of logger can only be run in the cluster to prevent double message handling. Some monitoring need to be created to allow for alerting if something in this process goes wrong. Example of metrics that's suitable for this process are: `number-of-incoming-message`, `number-of-saved-message`

### Web Server
Multiple Web Server replicas preferably in different machines should be deployed (take a look at kubernetes [`PodAntiAffinity`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)). The service will serve an HTML page with a `javascript` file that connect to a `WebSocket` server on the same `HTTP` server. Extra points if you can make this application scale in regard of connected websocket client. Example of metrics that's suitable for this process are: `number-of-connected-client`, `number-of-page-request`

### Broadcaster
This application will simulate data generation from vehicles. You can run multiple of this application as long as they have unique name, those name can be configured via an `environment variable` called `BUS_NAME`. It will broadcast messages to `nats` on this topic `vehicle.BUS_NAME`. Example of metrics that's suitable for this process are: `number-of-broadcasted-message`

## The assignment
As a versatile devops engineer you have to deploy a Kubernetes cluster containing one master and three worker nodes. Those Kubernetes workers will be the place to deploy all services that are neccesary for this assignment. Of course, all configuration is maintained in a git repository on your github account.

We will provide you with a sandbox environment on AWS, so you can go nuts.

As developers of these three beautiful services that are in this repo, of course, we need proper CI/CD!

### Pointers
- [ ] provision your cluster using `kops` (https://github.com/kubernetes/kops)
- [ ] use Helm Charts to deploy `gitlab` and the other services (https://github.com/helm/charts)
- [ ] Set-up CI/CD
- [ ] Use `gitlab` for your CI/CD
- [ ] Think of auto-scaling
- [ ] You can use Let's Encrypt to create the necasary certificates (https://letsencrypt.org/)
- [ ] We have setup Route 53 for your domain *.devops.viriciti.com, 

## Questions
If you have any questions about the assignment or project setup feel free to contact us at <a href='mailto:s.surur@viriciti.com'>s.surur@viriciti.com</a>. Please do not hessitate for this. You are also more then welcome to come by the office any time. We're always ready to help. The idea is that something is created that you learn from and in the end be proud of.

Good luck with the assignment!

