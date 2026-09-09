import { Router } from 'express';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { toggleBookmarkController } from '../controllers/toggleBookmark.controller';
import { toggleBookmarkSchema } from '../validators/toggleBookmark.validation';
import { requireVerifiedEmail } from '@/shared/middlewares/requireVerifiedEmail.middleware';
import { getAllBookmarkSchema } from '../validators/getAllBookmark.validation';
import { getAllBookmarksController } from '../controllers/getAllBookmarks.controller';
import { resolveCurrentUser } from '@/shared/middlewares/resolveCurrentUser.middleware';

const router = Router();

router
    .route('/:targetType/:targetId')
    .post(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, validate(toggleBookmarkSchema), toggleBookmarkController);

router
    .route('/')
    .get(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, validate(getAllBookmarkSchema), getAllBookmarksController);

    export default router;