## Customer Feedback -> Sentiment Analysis -> Dashboard

### Architecture
![](./feedback-sentiment-architecture.png)

### Build instruction
```bash

docker build ./feedback-service -t feedback-service -f feedback-service/Dockerfile
docker build ./sentiment-service -t sentiment-service -f sentiment-service/Dockerfile
docker build ./sentiment-dashboard -t sentiment-dashboard -f sentiment-dashboard/Dockerfile
```

### Running locally
```bash
# assuming minikube is installed
kubectl create -f feedback-sentiment-app-single-pod.yaml
# running tunnel into minikube
minikube tunnel --cleanup
```
