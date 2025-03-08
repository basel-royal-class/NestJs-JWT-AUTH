"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth-guard");
let FavoritesController = class FavoritesController {
    getFavorites(req) {
        const userId = req.user._id;
        const message = `Hello, ${userId}! You have 16 items in your favorites`;
        return { message: message };
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Get)('favorites'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "getFavorites", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, common_1.Controller)('b2c'),
    (0, common_1.UseGuards)(new auth_guard_1.JwtAuthGuard('b2c'))
], FavoritesController);
//# sourceMappingURL=favorites-controller.js.map