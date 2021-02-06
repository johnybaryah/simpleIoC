import { IGuidService } from '../services/guidService';

export interface IControllerResponse{
    statusCode: number;
    response: string;
}

export interface IController{
    getAll : () => IControllerResponse;    
}

export class guidController implements IController 
{   
    private _guidService: IGuidService;

    constructor(_guidService: IGuidService)
    {        
        this._guidService = _guidService[0];
    }

    getAll(): IControllerResponse {
        
        const arr: string[] = 
        [
            this._guidService.getGuid()
        ];

        return {
            statusCode: 200,
            response: JSON.stringify(arr)
        }
    }    
}