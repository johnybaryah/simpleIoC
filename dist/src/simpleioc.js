"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCollection = exports.LifeTime = void 0;
var LifeTime;
(function (LifeTime) {
    LifeTime[LifeTime["Transient"] = 0] = "Transient";
    LifeTime[LifeTime["Scoped"] = 1] = "Scoped";
    LifeTime[LifeTime["Singleton"] = 2] = "Singleton";
})(LifeTime = exports.LifeTime || (exports.LifeTime = {}));
var Registry = /** @class */ (function () {
    function Registry() {
    }
    Registry.get = function (key) {
        var service = this._registry.get(key);
        if (typeof service === "undefined")
            throw new Error("No such service registered. Name: " + key);
        return service;
    };
    Registry.set = function (key, val) {
        this._registry.set(key, val);
    };
    Registry.clear = function () {
        this._registry.clear();
    };
    Registry._registry = new Map();
    return Registry;
}());
var ServiceCollection = /** @class */ (function () {
    function ServiceCollection() {
        Registry.clear();
    }
    ServiceCollection.prototype._getDefinition = function (scope, impl, dependencies) {
        var definition = {
            lifeTIme: scope,
            implementation: impl,
            dependencies: dependencies,
            instanceCreated: false
        };
        return definition;
    };
    ServiceCollection.prototype.addSingleton = function (serviceName, serviceImpl, serviceDependencies) {
        if (serviceDependencies === void 0) { serviceDependencies = []; }
        Registry.set(serviceName, this._getDefinition(LifeTime.Singleton, serviceImpl, serviceDependencies));
    };
    ;
    ServiceCollection.prototype.addTransient = function (serviceName, serviceImpl, serviceDependencies) {
        if (serviceDependencies === void 0) { serviceDependencies = []; }
        Registry.set(serviceName, this._getDefinition(LifeTime.Transient, serviceImpl, serviceDependencies));
    };
    ServiceCollection.prototype.buildContainer = function () {
        return new container();
    };
    return ServiceCollection;
}());
exports.ServiceCollection = ServiceCollection;
var container = /** @class */ (function () {
    function container() {
    }
    container.prototype.getService = function (name) {
        var _this = this;
        var _a, _b;
        var service = Registry.get(name);
        // if (typeof service === 'undefined')
        //     throw new error("No such service registered. Name: " + name);
        // if definiion is class
        if (typeof service.implementation === 'function') {
            // handle transient
            if (service.lifeTIme === LifeTime.Transient) {
                // resolve dependencies - if none then return new instance
                if (((_a = service.dependencies) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    return new service.implementation();
                }
                else {
                    var dependencies_1 = [];
                    service.dependencies.forEach(function (d) { return dependencies_1.push(_this.getService(d)); });
                    return new service.implementation(dependencies_1);
                }
            }
            if (service.lifeTIme === LifeTime.Singleton) {
                if (service.instanceCreated)
                    return service.implementation;
                else {
                    service.instanceCreated = true;
                    if (((_b = service.dependencies) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                        service.implementation = new service.implementation();
                    }
                    else {
                        var dependencies_2 = [];
                        service.dependencies.forEach(function (d) { return dependencies_2.push(_this.getService(d)); });
                        service.implementation = new service.implementation(dependencies_2);
                    }
                    return service.implementation;
                }
            }
        }
        else {
            return service.implementation;
        }
        throw new Error('Not implemented code reached');
    };
    return container;
}());
//# sourceMappingURL=simpleioc.js.map