import { Router } from 'express';
import { userProfileUpdateValidationSchema } from '../validators/profileUpdate.validation';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import {
    getCurrentUserPersonalProfile,
    getCurrentUserPublicProfile,
    updateCurrentUserProfile,
    updateUserProfileAvatar,
} from '../controllers/users.controller';
import { validate } from '@/shared/middlewares/validate.middleware';
import { avatarUpload } from '@/shared/middlewares/uploadAvatar.middleware';
import { getUsernameSchema } from '../validators/usernameSchema.validation';
import { requireVerifiedEmail } from '@/shared/middlewares/requireVerifiedEmail.middleware';
import { resolveCurrentUser } from '@/shared/middlewares/resolveCurrentUser.middleware';

const router = Router();

router.route('/').get(verifyFirebaseToken, resolveCurrentUser, getCurrentUserPersonalProfile);
router.route('/:username').get(validate(getUsernameSchema), getCurrentUserPublicProfile);

router
    .route('/')
    .patch(
        verifyFirebaseToken,
        resolveCurrentUser,
        requireVerifiedEmail,
        validate(userProfileUpdateValidationSchema),
        updateCurrentUserProfile
    );
router
    .route('/avatar')
    .patch(
        verifyFirebaseToken,
        resolveCurrentUser,
        requireVerifiedEmail,
        avatarUpload.single('file'),
        updateUserProfileAvatar
    );

export default router;
