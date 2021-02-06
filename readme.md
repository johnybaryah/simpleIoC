# Simple IoC library for Typescript

Currently supports `transient` and `singleton` lifetimes.

### Usage:

``` ts
// init a new service collection
const services = new ServiceCollection();

// register services [eg: myService of type IService]
services.addTransient('myService', myServiceImpl, DependenciesByName[]);

// register another service that has dependency on previous service 
services.addTransient('myService2', myService2Impl, ['myService']);

// build container
const container = services.createContainer();

// retrieve registered services
const service = container.getService('myService') as IService;

service.doSomething();
```

______________________________

