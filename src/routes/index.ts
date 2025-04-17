import { Router } from 'express';
import userRoutes from '../routes/api/userRoutes';
import thoughtRoutes from '../routes/api/thoughtsRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
