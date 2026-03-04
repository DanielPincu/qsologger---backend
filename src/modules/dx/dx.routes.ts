import { Router } from 'express'
import * as DXController from './dx.controller'
import { requireAuth } from '../../middleware/requireAuth.middleware'

const router = Router()

router.get('/record', requireAuth, DXController.getDxRecord)
router.get('/stats', requireAuth, DXController.getDxStats)
router.get('/by-band', requireAuth, DXController.getDxByBand)
router.get('/grids', requireAuth, DXController.getWorkedGrids)
router.get('/dxcc', requireAuth, DXController.getDXCC)

export default router