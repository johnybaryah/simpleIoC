import { guidController, IController } from "./controllers/guidController";
import { guidService, IGuidService } from "./services/guidService";
import { IContainer, IServiceCollection, ServiceCollection } from "./simpleioc";


const services = new ServiceCollection();

services.addTransient('GuidService', guidService);
services.addTransient('GuidController', guidController, ['GuidService']);

const container: IContainer = services.buildContainer();

const service_instance1 = container.getService('GuidService') as IGuidService;
const service_instance2 = container.getService('GuidService') as IGuidService;

console.log(service_instance1.getGuid());
console.log(service_instance2.getGuid());

