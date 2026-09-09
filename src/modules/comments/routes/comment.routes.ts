import { Router } from 'express';
import { validate } from '@/shared/middlewares/validate.middleware';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { getRepliesSchema } from '../validators/getReplies.validation';
import { getRepliesOnCommentsController } from '../controllers/getReplies.controller';
import { updateCommentSchema } from '../validators/updateComment.validation';
import { deleteCommentController } from '../controllers/deleteComment.controller';
import { updateCommentController } from '../controllers/updateComment.controller';
import { deleteCommentSchema } from '../validators/deleteComment.validation';
import { toggleCommentLikeController } from '@/modules/likes/controllers/toggleCommentLike.controller';
import { requireVerifiedEmail } from '@/shared/middlewares/requireVerifiedEmail.middleware';
import { resolveCurrentUser } from '@/shared/middlewares/resolveCurrentUser.middleware';

const router = Router();

router.route('/:commentId/replies').get(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, validate(getRepliesSchema), getRepliesOnCommentsController);
router.route("/:commentId").patch(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, validate(updateCommentSchema), updateCommentController);
router.route("/:commentId").delete(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, validate(deleteCommentSchema), deleteCommentController)
router.route("/:commentId/like").post(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, validate(deleteCommentSchema), toggleCommentLikeController)

export default router;
