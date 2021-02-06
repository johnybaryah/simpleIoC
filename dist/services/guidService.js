"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guidService = void 0;
var guid_typescript_1 = require("guid-typescript");
var guidService = /** @class */ (function () {
    function guidService() {
        this._guid = guid_typescript_1.Guid.create().toString();
    }
    guidService.prototype.getGuid = function () {
        return this._guid;
    };
    return guidService;
}());
exports.guidService = guidService;
//# sourceMappingURL=guidService.js.map