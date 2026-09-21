import { Router } from "express";
import { 
    getMyProfile,
    updateMyProfile,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
} from "../controllers/member.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyJWT)
// user routes 


router.route('/me')
.get(getMyProfile)
.patch(updateMyProfile)

// router.route('/me/membership')
// .get(getMyMembership)

// router.route('/me/trainer')
// .get(getMyTrainer)

// router.route('/me/payments')
// .get(getMyPayments)

// router.route('/me/attendance')
// .get(getMyAttendance)

// Admin/Trainer

router.route('/').get(getAllMembers)
router.route('/:memberId')
.get(getMemberById)
.patch(updateMember)
.delete(deleteMember);
// router.route('/:memberId/trainer').patch(assignTrainer)



export default router