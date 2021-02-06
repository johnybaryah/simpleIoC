"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guidController_1 = require("./controllers/guidController");
var guidService_1 = require("./services/guidService");
var simpleioc_1 = require("./simpleioc");
var services = new simpleioc_1.ServiceCollection();
services.addTransient('GuidService', new guidService_1.guidService());
services.addTransient('GuidController', guidController_1.guidController, ['GuidService']);
var container = services.buildContainer();
var service_instance1 = container.getService('GuidService');
var service_instance2 = container.getService('GuidService');
console.log(service_instance1.getGuid());
console.log(service_instance2.getGuid());
//# sourceMappingURL=index.js.map