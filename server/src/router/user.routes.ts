import { Router } from "express";

import * as userController from '../controller/user.controller'

import validRegister from '../middleware/validation/user/validregister'
import validLogin from '../middleware/validation/user/validlogin'

const router = Router()

router.get("/allusers", userController.allUsers)
router.get("/allusers/:id", userController.getUser)

router.post("/register", validRegister, userController.register)
router.post("/login", validLogin, userController.login)

router.delete("/removeuser/:id", userController.removeUser)

export default router
