# Commandos con Kubectl

### Para crear un pod

```
kubectl run serverweb --image=nginx:alpine
```

### Para listar los tipos de recursos

```
kubectl version
kubectl api-resources
```

### eliminar elementos creados del manifiesto

```
kubectl delete -f nombre_archivo_maanifiesto
```