"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
const router = (0, express_1.Router)();
router.get("/", users_1.default.getAllUsers);
router.get("/my-user-profile", users_1.default.getMyUserProfile);
router.patch("/my-user-profile", users_1.default.updateMyUserProfileData);
router.delete("/my-user-profile", users_1.default.deactivateMyProfile);
router.delete("/my-user-profile-delete", users_1.default.deleteMyAccount);
router.get("/:id", users_1.default.getSelectedUsers);
exports.default = router;
//# sourceMappingURL=users.js.map