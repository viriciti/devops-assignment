# ViriCiti DevOps Assignment
![](https://imgs.xkcd.com/comics/tools.png)

## Introduction
This repository holds the ViriCiti DevOps assignment. In this project you will find two folders that each hold a separate microservice, each supplied with a Dockerfile.

The following picture depicts the services and shows the corresponding dataflow:

![](https://github.com/viriciti/devops-assignment/raw/master/framework.png)

The services are:
* (from this repo) [`broadcaster`](https://github.com/viriciti/devops-assignment/blob/master/broadcaster): a process per bus driving around, each using its own env variable vor bus name `BUS_NAME=some-buse-name-xyz` and publishing its vehicle parameters on the `nats` broker
* (from this repo) [`web-server`](https://github.com/viriciti/devops-assignment/blob/master/web-server): in replicated set-up, showing all vehicle parameters over a websocket to connecting web browsers
* `nats`: in a cluster set-up (https://nats.io)

As can be seen, the connecting web browsers will connect over an AWS Elastic Load Balancer (ELB) which will point to the internal (main) nginx ingress router ([https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx)) for Kubernetes.

Finally, as you can see - in support of CI/CD - there is `gitlab`.

### NATS
To connect all applications a HA (High Availability) NATS cluster needs to be deployed. This service will connect the `broadcaster` with the `web-server` and `logger`, so you need to make sure that they are configured correctly.

### Web Server
Multiple Web Server replicas, preferably in different machines, should be deployed (take a look at kubernetes [`PodAntiAffinity`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)). The service will serve an HTML page with a `javascript` file that connects to a `WebSocket` server on the same `HTTP` server. Extra points if you can make this application scale in regard of connected websocket clients. Example of metrics that would be suitable for this process are: `number-of-connected-client`, `number-of-page-request`.

### Broadcaster
This application will simulate data generation from vehicles. You can run multiple of this application as long as they have a unique name, which can be configured via an environment variable called `BUS_NAME`. It will broadcast messages to `nats` on topic `vehicle.some_bus_name_xyz`. An example of possible metrics that could be suitable for this process is: `number-of-broadcasted-messages`.

## The assignment
We have provided you with a Kubernetes cluster (version 1.12) running in AWS. This cluster already contains a gitlab installation (gitlab.trials.viriciti.com) with an integrated docker registry (registry.trials.viriciti.com) and an NGINX Ingress Controller. A `*.trials.viriciti.com` DNS record points to that ingress controller.

As developers of these three beautiful services that are in this repo, of course, we need proper CI/CD!. You're free choose which CI/CD platform to use, we suggest GitLab with GitLab runner since it is already available in the cluster.

You're free to come up with your own flow for the CI/CD. There are a couple requirements though:
- [ ] Deploying an app to "production" should involve a manual action (big red button, slack message etc.)
- [ ] Developers should be able to rollback a deployment.
- [ ] The CI/CD pipeline should register the web-server to the ingress controller to be available externally with a URL (something.trials.viriciti.com).
- [ ] Multiple feature branches should be able to live alongide each other in the cluster (and be accessible via different URLs).

### Pointers
- [ ] Use Helm Charts to centrally configure and deploy services (https://github.com/helm/charts)
- [ ] Think of auto-scaling
- [ ] You can use Let's Encrypt to create the necessary certificates (https://letsencrypt.org/)
- [ ] If you want to enable monitoring, [Prometheus](https://prometheus.io) is a great choice

## Questions
If you have any questions about the assignment, the project setup or you're simply stuck, feel free to contact us at <a href='mailto:i.klop@viriciti.com'>i.klop@viriciti.com</a>, <a href='mailto:s.surur@viriciti.com'>s.surur@viriciti.com</a>, <a href='mailto:s.rijk@viriciti.com'>s.rijk@viriciti.com</a> and <a href='mailto:t.thijs@viriciti.com'>t.thijs@viriciti.com</a>. Please do not hesitate for this! You are also more then welcome to come by the office at any time. We're always ready to help. The idea is that something is created that you learn from and in the end can be proud of.

Finally, you will present your process, technical decisions and outcome to us. Looking forward to it!

Good luck with the assignment!
