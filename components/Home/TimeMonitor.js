import React from "react"
import moment from "moment"

const TimeMonitor = (props) => {
  const formatSecondsToTime = (seconds) => {
    return moment.utc(seconds).format("HH:mm:ss")
  }
  return (
    <>
      <div className="col-lg-5 col-md-7 col-sm-12 col-12 mx-auto">
        <div className="content text-center bg-light display-1">
          {formatSecondsToTime(props.time)}
        </div>
      </div>
    </>
  )
}

export default TimeMonitor
