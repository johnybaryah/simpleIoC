"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCollection = exports.LifeTime = void 0;
var console_1 = require("console");
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
            throw console_1.exception("No such service registered. Name: " + key);
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
    }
    ServiceCollection.prototype.addSingleton = function (serviceName, serviceImpl, serviceDependencies) {
        if (serviceDependencies === void 0) { serviceDependencies = []; }
        var definition = {
            lifeTIme: LifeTime.Singleton,
            implementation: serviceImpl,
            dependencies: serviceDependencies,
            instanceCreated: false
        };
        Registry.set(serviceName, definition);
    };
    ;
    ServiceCollection.prototype.addTransient = function (serviceName, serviceImpl, serviceDependencies) {
        if (serviceDependencies === void 0) { serviceDependencies = []; }
        // TODO excepton handling ... 
        var definition = {
            lifeTIme: LifeTime.Transient,
            implementation: serviceImpl,
            dependencies: serviceDependencies,
            instanceCreated: false
        };
        Registry.set(serviceName, definition);
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
        if (typeof service === 'undefined')
            throw console_1.exception("No such service registered. Name: " + name);
        // if definiion is class
        if (typeof service.implementation === 'function') {
            // handle transient
            if (service.lifeTIme === LifeTime.Transient) {
                // resolve dependencies - if none then return new instance
                if (((_a = service.dependencies) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    return new service.implementation();
                }
                else {
                    var dependencies = [];
                    dependencies = service.dependencies.map(function (d) { return _this.getService(d); });
                    console.log('retrieved dependencies for ' + name, dependencies);
                    var r = new service.implementation(dependencies);
                    console.log(r);
                    return r;
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
                        var dependencies = [];
                        dependencies = service.dependencies.map(function (d) { return _this.getService(d); });
                        console.log('retrieved dependencies for ' + name, dependencies);
                        service.implementation = new service.implementation(dependencies);
                    }
                    return service.implementation;
                }
            }
        }
        else {
            return service.implementation;
        }
        throw console_1.exception('Not implemented code reached');
    };
    return container;
}());
//# sourceMappingURL=simpleioc.js.map