import express from 'express'
import ExpressFormidable from 'express-formidable'
import {
    createApiController,
    deleteApiController,
    photoUploadController,
    readApiControlle,
    searchApiController,
    singleApiController,
    updateApiController
} from '../controllers/apiController.js'

//routing
const router = express.Router()

router.get('/read', ExpressFormidable(), readApiControlle)
router.post('/create', ExpressFormidable(), createApiController)
router.get('/single/:id',ExpressFormidable(),singleApiController)
router.put('/update/:id', ExpressFormidable(), updateApiController)
router.delete('/delete/:id', ExpressFormidable(), deleteApiController)
router.get('/search/:keyboard', searchApiController)
router.get('/photo/:id', ExpressFormidable(), photoUploadController)


export default router