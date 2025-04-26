# 📚 Bookstore Microservices - Local Kubernetes Deployment (single Pod)

Deploy the full Bookstore app stack (Gateway + Auth + Catalog + Orders + RabbitMQ) into a **single Kubernetes Pod** locally for testing.

---

## ⚙️ Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- `kubectl`
- Docker (installed for Minikube backend)

---

## 🚀 Deployment Steps

### 1. Start Minikube
```bash
minikube start
```

---

### 2. Create ConfigMap (for .env)
```bash
kubectl create configmap bookstore-env --from-env-file=.env
```
> **Why:** To provide environment variables to all containers.

---

### 3. Apply Deployment and Service
```bash
kubectl apply -f deployAndService.yml
kubectl apply -f exposeService.yml
```
> **Why:**  
> - `deployAndService.yml` → Creates the Pod with all microservices.  
> - `exposeService.yml` → Exposes services inside & outside (LoadBalancer).

---

### 4. Enable Minikube Tunnel (for LoadBalancer IP)
```bash
minikube tunnel
```
> **Why:** Required to assign a proper IP to `bookstore-service`.

_(Keep this terminal open)_

---

### 5. Apply Horizontal Pod Autoscaler (Optional for CPU scaling)
```bash
kubectl apply -f hpa.yml
```
> **Why:** Auto-scales replicas between 2–5 based on CPU usage.

---

## 🌐 Access Services

| Service | URL |
|:--------|:----|
| API Gateway | http://127.0.0.1:8080 |
| RabbitMQ Dashboard | http://127.0.0.1:15672 (guest/guest) |

---

## 📜 Useful Commands

| Action | Command |
|:-------|:--------|
| See all pods and services | `kubectl get all` |
| View logs of a container | `kubectl logs <pod-name> -c <container-name>` |
| Restart deployment | `kubectl rollout restart deployment bookstore-deployment` |

---

# ✅ That's it!  
Your full system will now be live inside a **single Kubernetes Pod** for testing! 🚀
