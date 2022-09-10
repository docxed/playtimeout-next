import React, { useState } from "react"
import TimeMonitor from "../components/Home/TimeMonitor"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import axios from "axios"
import moment from "moment"
import "moment/locale/th"

const Home = () => {
  const [player, setPlayer] = useState("องศา")
  const [time, setTime] = useState(5 * 1000)
  // const [time, setTime] = useState(5 * 1000)
  const [timeRunning, setTimeRunning] = useState(false)
  const handlePlayer = (event) => {
    setPlayer(event.target.value)
  }
  const startTimer = () => {
    setTimeRunning(true)
    notifyTimer({ type: "start timer", time: time })
    let count = time
    let interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1000)
      count -= 1000
      if (count <= 0) {
        clearInterval(interval)
        notifyTimer({ type: "time up", time: time })
      }
    }, 1000)
  }
  const formatSecondsToTime = (seconds) => {
    return moment.utc(seconds).format("HH:mm:ss")
  }
  const notifyTimer = (value) => {
    const { type, time } = value
    const prefix = `${moment().format("LT")} น. |`
    let message = ""
    let stickerPackageId = ""
    let stickerId = ""
    if (type === "start timer") {
      let timeStart = new Date()
      let timeOut = timeStart.setSeconds(timeStart.getSeconds() + time / 1000)
      message = `${prefix} 🤣 ${player} เริ่มจับเวลาเล่นเกม ${formatSecondsToTime(
        time
      )} ชั่วโมง และจะหมดเวลาเล่นใน ${moment(timeOut).format("LT")} น. `
      stickerPackageId = `446`
      stickerId = `1992`
    } else if (type === "time up") {
      message = `${prefix} 🥲 ${player} หมดเวลาเล่นเกมแล้ว`
      stickerPackageId = `446`
      stickerId = `2007`
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BASEURL}/notify`, {
        message: message,
        stickerPackageId: stickerPackageId,
        stickerId: stickerId,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error)
      })
  }
  const increaseTime = () => {
    setTime((prevTime) => prevTime + 5 * 60 * 1000)
    let message = ""
    let stickerPackageId = ""
    let stickerId = ""
    const prefix = `${moment().format("LT")} น. |`
    message = `${prefix} ➕ ${player} เพิ่มเวลาเล่นเกม 5 นาที  เหลือ ${formatSecondsToTime(
      time + 5 * 60 * 1000
    )} ชั่วโมง`
    axios
      .post(`${process.env.NEXT_PUBLIC_BASEURL}/notify`, {
        message: message,
        stickerPackageId: stickerPackageId,
        stickerId: stickerId,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error)
      })
  }
  const decreaseTime = () => {
    setTime((prevTime) => prevTime - 5 * 60 * 1000)
    let message = ""
    let stickerPackageId = ""
    let stickerId = ""
    const prefix = `${moment().format("LT")} น. |`
    message = `${prefix} ➖ ${player} ลบเวลาเล่นเกม 5 นาที เหลือ ${formatSecondsToTime(
      time - 5 * 60 * 1000
    )} ชั่วโมง`
    axios
      .post(`${process.env.NEXT_PUBLIC_BASEURL}/notify`, {
        message: message,
        stickerPackageId: stickerPackageId,
        stickerId: stickerId,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <div className="h1">จับเวลาเล่นเกม</div>
      <div className="mb-3 col-lg-3 col-md-5 col-sm-12 col-12">
        <Form.Select onChange={handlePlayer}>
          <option value="องศา" defaultValue={true}>
            องศา
          </option>
          <option value="น้องอัญ">น้องอัญ</option>
        </Form.Select>
      </div>
      {!timeRunning && (
        <div className="mb-3 ">
          <Button variant="success" onClick={increaseTime} className="me-2">
            บวก 5 นาที
          </Button>
          <Button variant="danger" onClick={decreaseTime}>
            ลบ 5 นาที
          </Button>
        </div>
      )}

      <TimeMonitor time={time} />
      <div className="text-center mt-3">
        <Button variant="primary" onClick={startTimer} disabled={timeRunning}>
          จับเวลา
        </Button>
      </div>
    </>
  )
}

export default Home
