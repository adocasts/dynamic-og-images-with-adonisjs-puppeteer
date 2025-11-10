/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const OgImagesController = () => import('#controllers/og_images_controller')
import router from '@adonisjs/core/services/router'
import { throttleOgImages } from './limiter.js'

router.on('/').render('pages/home')
router.get('/og-images', [OgImagesController, 'index']).as('og.images.index').use(throttleOgImages)
router.get('/og-images/render', [OgImagesController, 'render']).as('og.images.render')
