import { Router } from "express";
import usersRouter from "../controllers/users";

const router = Router();

router.get("/", usersRouter.getAllUsers);
router.get("/my-user-profile", usersRouter.getMyUserProfile);
router.patch("/my-user-profile", usersRouter.updateMyUserProfileData);
router.delete("/my-user-profile", usersRouter.deactivateMyProfile);
router.delete("/my-user-profile-delete", usersRouter.deleteMyAccount);
router.get("/:id", usersRouter.getSelectedUsers);

export default router;
