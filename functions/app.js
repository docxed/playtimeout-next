import express from "express"
import "dotenv/config"
import cors from "cors"
import axios from "axios"
import moment from "moment"

class Server {
  constructor() {
    this.app = express()
    this.server()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    const corsOptions = {
        origin: process.env.NODE_ENV === "production" ? ["https://playtimeout-frontend.herokuapp.com", "https://playtimeout-next.vercel.app", "http://localhost"] : true,
    }
    this.app.use(express.json())
    this.app.use(cors(corsOptions))
    this.app.use((req, res, next) => {
      return next()
    })
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.status(200).send("ok")
    })
    this.app.post("/notify", (req, res) => {
      const { message, stickerPackageId, stickerId } = req.body
      axios({
        method: "post",
        url: `https://${process.env.LINE_NOTIFY_HOST}/api/notify`,
        headers: {
            Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        },
        data: `message=${message}&stickerPackageId=${stickerPackageId}&stickerId=${stickerId}`
      })
        .then(response => {
            res.status(200).send("ok")
        })
        .catch(error => {
   
            res.status(500).send("error")
        })
    })
  }

  server() {
    const port = process.env.PORT || 3001
    this.app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`)
    })
  }
}

export default new Server()
