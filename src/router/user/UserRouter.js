import userSystem from 'system/user/userCommandSystem.js'
import { Responder } from 'system/responder.js'
import { UserSchemaValidate } from 'domains/user/User.js'
import Validation from 'system/validation.js'

const aws = require('aws-sdk'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION
})

const s3 = new aws.S3()
const upload = multer({ storage: 
  multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function(req, file, cb) {
      return cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
  })
})

const singleUpload = upload.single('image', 1)

export const UserRouter = {
  fillRouter: (router, handlers) => {
    router.get('/login', handlers.login);
    router.post('/register',
      Validation.validate(UserSchemaValidate),
      handlers.register
    ),
    router.post('/admin',
      
    ),
    router.post('/upload', handlers.upload)
  },

  handlers: {
    login: (req) => {
      return 'login'
    },
    register: (req) => {
      const userInfo = userSystem.register(req.body)
      return userInfo
    },
    upload: (req, res) => {
      singleUpload(req, res, function(error) {
        // console.log('----------------', req);
        if(error) {
          return 'Upload image false!!'
        }
        // console.log('herer', singleUpload.caller)
        console.log('-----------------', new Error().stack);
        res.json({'imageUrl': req.file.location})
      })
    }
  }

}
