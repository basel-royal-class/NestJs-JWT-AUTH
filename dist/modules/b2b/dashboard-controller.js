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
Object.defineProperty(exports, "__esModule", { value: true });
exports.B2BDashboardController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth-guard");
let B2BDashboardController = class B2BDashboardController {
    getDashboard() {
        return { message: 'B2B Dashboard' };
    }
};
exports.B2BDashboardController = B2BDashboardController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], B2BDashboardController.prototype, "getDashboard", null);
exports.B2BDashboardController = B2BDashboardController = __decorate([
    (0, common_1.Controller)('b2b'),
    (0, common_1.UseGuards)(new auth_guard_1.JwtAuthGuard('b2b'))
], B2BDashboardController);
//# sourceMappingURL=dashboard-controller.js.map