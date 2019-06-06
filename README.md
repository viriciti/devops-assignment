# ViriCiti DevOps Assignment
![](http://turnoff.us/image/en/before-devops-after-devops.png)

## Introduction
This repository holds the ViriCiti DevOps assignment. In this project you will find a folder that holds a microservice, supplied with a Dockerfile.

The following picture depicts the service and shows the corresponding dataflow:

![](https://github.com/viriciti/devops-assignment/raw/master/framework.png)

As can be seen, the connecting web browsers will connect over an AWS Elastic Load Balancer (ELB) which will point to an NGINX ingress router ([https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx)) for Kubernetes.

### Web Server
Multiple Web Server replicas, preferably in different machines, should be deployed (take a look at kubernetes [`PodAntiAffinity`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)). The service will serve a simple message.

## The assignment
We have provided you with a Kubernetes cluster (version 1.12) running in AWS. This cluster already contains an NGINX Ingress Controller. A `*.trials.viriciti.com` DNS record points to that ingress controller.

As developers of this beautiful service, of course, we need proper CI/CD! You're free to choose which CI/CD platform to use, we suggest GitLab with GitLab runner since it is what we use in production.

You're free to come up with your own flow for the CI/CD. There are a couple of requirements though:
- [ ] Deploying an app to "production" should involve a manual action (big red button, slack message etc.)
- [ ] Developers should be able to rollback a deployment.
- [ ] The CI/CD pipeline should register the web-server to the ingress controller to be available externally with a URL (something.trials.viriciti.com).
- [ ] Multiple feature branches should be able to live alongside each other in the cluster (and be accessible via different URLs).

### Pointers
- You can use Let's Encrypt to create the necessary certificates (https://letsencrypt.org/)
- You can use [`helm`](https://helm.sh/) to install certain applications in Kubernetes.
- You can use helm to install Gitlab: [https://docs.gitlab.com/charts/](https://docs.gitlab.com/charts/)
  - Gitlab helm install requires certain DNS records to point to the ingress controller that the helm chart creates. You will have access to AWS Route 53 for the `trials.viriciti.com` domain.
  - In order to use Docker in Docker, the Gitlab runners have to run in [privileged mode](https://docs.gitlab.com/ee/user/project/clusters/#security-of-gitlab-runners). The default setting of the helm chart is to disable this feature, make sure you override that setting.
- NodeJS apps manage their dependencies in a package.json file, `npm install` installs the dependencies in a folder called `node_modules`.
- The tests can be executed by running `npm test`.

## Questions
If you have any questions about the assignment, the project setup or you're simply stuck, feel free to contact us at <a href='mailto:i.klop@viriciti.com'>i.klop@viriciti.com</a> and <a href='mailto:s.surur@viriciti.com'>s.surur@viriciti.com</a>. Please do not hesitate for this! You are also more then welcome to come by the office at any time. We're always ready to help. The idea is that something is created that you learn from and in the end can be proud of.

Finally, you will present your process, technical decisions and outcome to us. Looking forward to it!

Good luck with the assignment!
