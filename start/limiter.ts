/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', () => {
  return limiter.allowRequests(10).every('1 minute')
})

export const throttleOgImages = limiter.define('ogImages', () => {
  return limiter
    .allowRequests(3)
    .every('30 seconds')
    .usingKey('og_images')
    .limitExceeded((error) => {
      error.setMessage(
        'Too many og image requests are being made at one time. Please wait before requesting another'
      )
    })
})
