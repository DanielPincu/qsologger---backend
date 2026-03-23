import { Router } from 'express'
import * as DXController from './dx.controller'
import { requireAuth } from '../../middleware/requireAuth.middleware'

const router = Router()

router.get('/summary', requireAuth, DXController.getDxStats)
router.get('/longest', requireAuth, DXController.getDxRecord)
router.get('/longest-by-band', requireAuth, DXController.getDxByBand)
router.get('/longest-by-band/:band', requireAuth, DXController.getDxForBand)

router.get('/grids', requireAuth, DXController.getWorkedGrids)
router.get('/dxcc', requireAuth, DXController.getDXCC)

export default router