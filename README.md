# ViriCiti DevOps Assignment
![](http://turnoff.us/image/en/before-devops-after-devops.png)

## Introduction
This repository holds the ViriCiti DevOps assignment. In this project you will find a folder that holds a microservice, supplied with a Dockerfile.

### Web Server
Web Server is a simple stateless service that serves a simple HTTP message. You can deploy as many replicas of this service as you like.

## The assignment
As developers of this beautiful service, of course, we need proper CI/CD! We suggest GitLab with GitLab runner since it is what we use in production. You can create a free account at [https://gitlab.com/](https://gitlab.com/).

There are a couple of requirements:
- [ ] Test should be run on the pipeline and it should not be able to proceed if it fails
- [ ] The app should be deployed to a Kubernetes cluster (take a look at Minikube)
- [ ] Multiple feature branches should be able to live alongside each other in the cluster

Some pointers:
- NodeJS apps manage their dependencies in a package.json file, `npm install` installs the dependencies in a folder called `node_modules`.
- The tests can be executed by running `npm test`.

### Optional additions
- [ ] Gather metrics from deployed application
- [ ] Alerting in-case of anomalies in application

## Questions
If you have any questions about the assignment, the project setup or you're simply stuck, feel free to contact us at <a href='mailto:i.klop@viriciti.com'>i.klop@viriciti.com</a> and <a href='mailto:s.surur@viriciti.com'>s.surur@viriciti.com</a>. Please do not hesitate for this! We're always ready to help. The idea is that something is created that you learn from and in the end can be proud of.

Finally, you will present your process, technical decisions and outcome to us. Looking forward to it!

Good luck with the assignment!
