import { exception } from "console";

export interface IServiceDefinition{
    lifeTIme: LifeTime;
    implementation: any;
    instanceCreated: boolean;
    dependencies: any[];
}

export interface IServiceCollection{
    addTransient  : (serviceName: string, serviceImpl: any, serviceDependencies: any[]) => void;
    addSingleton  : (serviceName: string, serviceImpl: any, serviceDependencies: any[]) => void;
    buildContainer: () => IContainer;
}

export interface IContainer{
    getService(name: any) : any
}

export enum LifeTime{
    Transient,
    Scoped,
    Singleton
}

class Registry{
    static _registry   : Map<string, IServiceDefinition> = new Map<string, IServiceDefinition>();

    static get(key: string) : IServiceDefinition {
        const service = this._registry.get(key);

        if (typeof service === "undefined")
            throw exception("No such service registered. Name: " + key);

        return service as IServiceDefinition;
    }

    static set(key:string, val: IServiceDefinition){
        this._registry.set(key, val);
    }

    static clear(){
        this._registry.clear();
    }
}

export class ServiceCollection implements IServiceCollection{

    private _getDefinition(scope: LifeTime, impl: any, dependencies: any[]) {
        const definition: IServiceDefinition = {
            lifeTIme: scope,
            implementation: impl,
            dependencies: dependencies,
            instanceCreated : false
        };

        return definition;
    }
    addSingleton(serviceName: string, serviceImpl: any, serviceDependencies: any[] = []) {
        Registry.set(serviceName, this._getDefinition(LifeTime.Singleton, serviceImpl, serviceDependencies));
    };

    addTransient(serviceName: string, serviceImpl: any, serviceDependencies: any[] = []) {
        Registry.set(serviceName, this._getDefinition(LifeTime.Transient, serviceImpl, serviceDependencies));
    }

    buildContainer(): IContainer {
        return new container();
    }
}

class container implements IContainer{

    getService(name: string): any{
        
        const service = Registry.get(name);

        if (typeof service === 'undefined')
            throw exception("No such service registered. Name: " + name);

        // if definiion is class
        if (typeof service.implementation === 'function'){
            // handle transient
            if(service.lifeTIme === LifeTime.Transient){
                // resolve dependencies - if none then return new instance
                if (service.dependencies?.length === 0){                    
                    return new service.implementation();
                }
                else{
                    const dependencies: any[] = [];
                    service.dependencies.forEach(d => dependencies.push(this.getService(d)));
                    return new service.implementation(dependencies);
                }
            }

            if(service.lifeTIme === LifeTime.Singleton){
                if (service.instanceCreated)
                    return service.implementation;
                else{
                    service.instanceCreated = true;

                    if (service.dependencies?.length === 0){                    
                        service.implementation = new service.implementation();
                    }
                    else{                        
                        const dependencies: any[] = [];
                        service.dependencies.forEach(d => dependencies.push(this.getService(d)));
                        service.implementation = new service.implementation(dependencies);
                    }

                    return service.implementation;
                }
            }
        }
        else{
            return service.implementation;
        }
        throw exception('Not implemented code reached');
    }
}