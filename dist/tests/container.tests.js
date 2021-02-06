"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guidService_1 = require("../src/services/guidService");
var simpleioc_1 = require("../src/simpleioc");
describe('serviceCollection', function () {
    it('addsTransient', function () {
        var sc = new simpleioc_1.ServiceCollection();
        sc.addTransient('GuidService', guidService_1.guidService);
        var container = sc.buildContainer();
        var service1 = container.getService('GuidService');
        var service2 = container.getService('GuidService');
        var instance1_val = service1.getGuid();
        var instance2_val = service2.getGuid();
        expect(instance1_val === instance2_val).toBeFalse();
    });
    it('addsSingleton', function () {
        var sc = new simpleioc_1.ServiceCollection();
        sc.addSingleton('GuidService', guidService_1.guidService);
        var container = sc.buildContainer();
        var service1 = container.getService('GuidService');
        var service2 = container.getService('GuidService');
        var instance1_val = service1.getGuid();
        var instance2_val = service2.getGuid();
        expect(instance1_val === instance2_val).toBeTrue();
    });
});
//# sourceMappingURL=container.tests.js.map