import arcjet, {shield , detectBot , tokenBucket} from '@arcjet/node'
import { config } from 'dotenv'

config()
export const aj = arcjet({
    key : process.env.ARCJET_KEY,
    characteristics : ['ip.src'],
    rules : [
        shield({mode : 'LIVE'}),
        detectBot({
            mode:  'LIVE',
            allow : ['CATEGORY:SEARCH_ENGINE']
        }),
        tokenBucket({
            interval : 10,
            capacity : 10,
            refillRate :5
        })
    ]
})