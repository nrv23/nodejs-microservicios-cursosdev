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


### Para ingresar a un contenedor dentro de un pod

```
kubectl exec -it <nombre_pod> si tiene un solo contenedor -- sh
kubectl exec -it <nombre_pod> -c <nombre_contenedor> si tiene más de un contenedor -- sh
```