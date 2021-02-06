import { guidController, IController } from "../src/controllers/guidController";
import { guidService, IGuidService } from "../src/services/guidService";
import { ServiceCollection } from "../src/simpleioc"

describe('serviceCollection', function(){
    it ('addTransient', function(){
        const sc = new ServiceCollection();

        sc.addTransient('GuidService', guidService);
        const container = sc.buildContainer();

        const service1: IGuidService = container.getService('GuidService') as IGuidService;
        const service2: IGuidService = container.getService('GuidService') as IGuidService;

        const instance1_val = service1.getGuid();
        const instance2_val = service2.getGuid();

        let result = instance1_val === instance2_val;

        expect(result).toBeFalse()
    });

    it ('addSingleton', function(){
        const sc = new ServiceCollection();

        sc.addSingleton('GuidService', guidService);
        const container = sc.buildContainer();

        const service1: IGuidService = container.getService('GuidService') as IGuidService;
        const service2: IGuidService = container.getService('GuidService') as IGuidService;

        const instance1_val = service1.getGuid();
        const instance2_val = service2.getGuid();

        let result = instance1_val === instance2_val;

        expect(result).toBeTrue()
    });

    it('addTransientWithDependencies', function(){
        const sc = new ServiceCollection();
        sc.addSingleton('GuidService', guidService);
        sc.addTransient('Controller', guidController, ['GuidService']);

        const container = sc.buildContainer();

        const _guidService = container.getService('GuidService') as IGuidService;
        const _controller = container.getService('Controller') as IController;

        const expectedGuid = _guidService.getGuid();
        const guidResponseFromController = _controller.getAll().response;
        
        expect(guidResponseFromController).toContain(expectedGuid);
    })
})