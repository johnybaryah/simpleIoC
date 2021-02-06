"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guidController = void 0;
var guidController = /** @class */ (function () {
    function guidController(_guidService) {
        this._guidService = _guidService[0];
    }
    guidController.prototype.getAll = function () {
        var arr = [
            this._guidService.getGuid()
        ];
        return {
            statusCode: 200,
            response: JSON.stringify(arr)
        };
    };
    return guidController;
}());
exports.guidController = guidController;
//# sourceMappingURL=guidController.js.map