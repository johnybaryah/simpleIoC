"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guidController_1 = require("../src/controllers/guidController");
var guidService_1 = require("../src/services/guidService");
var simpleioc_1 = require("../src/simpleioc");
describe('serviceCollection', function () {
    it('addTransient', function () {
        var sc = new simpleioc_1.ServiceCollection();
        sc.addTransient('GuidService', guidService_1.guidService);
        var container = sc.buildContainer();
        var service1 = container.getService('GuidService');
        var service2 = container.getService('GuidService');
        var instance1_val = service1.getGuid();
        var instance2_val = service2.getGuid();
        var result = instance1_val === instance2_val;
        expect(result).toBeFalse();
    });
    it('addSingleton', function () {
        var sc = new simpleioc_1.ServiceCollection();
        sc.addSingleton('GuidService', guidService_1.guidService);
        var container = sc.buildContainer();
        var service1 = container.getService('GuidService');
        var service2 = container.getService('GuidService');
        var instance1_val = service1.getGuid();
        var instance2_val = service2.getGuid();
        var result = instance1_val === instance2_val;
        expect(result).toBeTrue();
    });
    it('addTransientWithDependencies', function () {
        var sc = new simpleioc_1.ServiceCollection();
        sc.addSingleton('GuidService', guidService_1.guidService);
        sc.addTransient('Controller', guidController_1.guidController, ['GuidService']);
        var container = sc.buildContainer();
        var _guidService = container.getService('GuidService');
        var _controller = container.getService('Controller');
        var expectedGuid = _guidService.getGuid();
        var guidResponseFromController = _controller.getAll().response;
        expect(guidResponseFromController).toContain(expectedGuid);
    });
});
//# sourceMappingURL=container.test.js.map