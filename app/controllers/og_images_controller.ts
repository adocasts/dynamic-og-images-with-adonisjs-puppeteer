import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import puppeteer, { Browser } from 'puppeteer'

export default class OgImagesController {
  async index({ request, response }: HttpContext) {
    let browser: Browser | null = null

    try {
      const url = new URL(
        router.makeUrl('og.images.render', {}, { qs: request.qs() }),
        env.get('APP_URL')
      )

      browser = await puppeteer.launch({
        args: ['--disable-dev-shm-usage'],
      })

      const page = await browser.newPage()

      await page.setViewport({ width: 1200, height: 630 })
      await page.goto(url.toString(), {
        waitUntil: 'networkidle0',
      })

      const screenshotBuffer = await page.screenshot({ type: 'jpeg' })

      await page.close()
      await browser.close()

      response.header('Content-Type', 'image/jpeg')
      response.send(screenshotBuffer)
    } catch (error) {
      browser?.close()
      throw error
    }
  }

  async render({ request, view }: HttpContext) {
    const title = request.input('title', 'Hello from OG Image!')
    return view.render('pages/og_image', { title })
  }
}
