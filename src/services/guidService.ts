import { Guid } from "guid-typescript";


export interface IGuidService{
    getGuid: () => string
}

export class guidService implements IGuidService{

    private _guid: string;

    constructor(){
        this._guid = Guid.create().toString();
    }

    getGuid() : string{
        return this._guid;
    }
}

