# ViriCiti DevOps Assignment
![](http://turnoff.us/image/en/before-devops-after-devops.png)

## Introduction
This repository holds the ViriCiti DevOps assignment. In this project you will find a folder that holds a microservice, supplied with a Dockerfile.

The following picture depicts the service and shows the corresponding dataflow:

![](https://github.com/viriciti/devops-assignment/raw/master/framework.png)

As can be seen, the connecting web browsers will connect over an AWS Elastic Load Balancer (ELB) which will point to an NGINX ingress router ([https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx)) for Kubernetes.

### Web Server
Web Server is a simple stateless service that serves a simple HTTP message. You can deploy as many replicas of this service as you like.

## The assignment
We have provided you with a Kubernetes cluster (version 1.12) running in AWS. This cluster already contains an NGINX Ingress Controller. A `*.trials.viriciti.com` DNS record points to that ingress controller.

As developers of this beautiful service, of course, we need proper CI/CD! You're free to choose which CI/CD platform to use, we suggest GitLab with GitLab runner since it is what we use in production. We have already installed Gitlab for you using the Gitlab helm chart ([https://docs.gitlab.com/charts/](https://docs.gitlab.com/charts/)). Access https://gitlab.trials.viriciti.com for Gitlab and https://registry.trials.viriciti.com for the Docker registry. Check out https://docs.gitlab.com/charts/installation/deployment.html#initial-login for the credentials.

You're free to come up with your own flow for the CI/CD. There are a couple of requirements though:
- [ ] The CI/CD pipeline should register the web-server to the ingress controller to be available externally with a URL (something.trials.viriciti.com).
- [ ] Multiple feature branches should be able to live alongside each other in the cluster (and be accessible via different URLs).

Some pointers:
- NodeJS apps manage their dependencies in a package.json file, `npm install` installs the dependencies in a folder called `node_modules`.
- The tests can be executed by running `npm test`.

### Optional additions
- If you want to, you can use Let's Encrypt to create TLS certificates (https://letsencrypt.org/).
- Deploying an app to "production" should involve a manual action (big red button, slack message etc.)
- Developers should be able to rollback a deployment.
- Multiple Web Server replicas, preferably in different machines, should be deployed (take a look at kubernetes [`PodAntiAffinity`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)). The service will serve a simple message.

## Questions
If you have any questions about the assignment, the project setup or you're simply stuck, feel free to contact us at <a href='mailto:i.klop@viriciti.com'>i.klop@viriciti.com</a> and <a href='mailto:s.surur@viriciti.com'>s.surur@viriciti.com</a>. Please do not hesitate for this! You are also more then welcome to come by the office at any time. We're always ready to help. The idea is that something is created that you learn from and in the end can be proud of.

Finally, you will present your process, technical decisions and outcome to us. Looking forward to it!

Good luck with the assignment!
