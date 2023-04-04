import "./TimerStyle.scss";
import { useTimer } from "react-timer-hook";

const TimerSection = ({ expirationsTime, timerHeading, callback }: any) => {
  const time = new Date(expirationsTime * 1000);
  return (
    <div className="timerBox">
      <h2 className="timerBox__title mb25">{timerHeading}</h2> 
      {expirationsTime > 0 ? (
        <MyTimer expiryTimestamp={time} callback={callback} />
      ) : (

          <TimerHtml days="00" hours="00" minutes="00" seconds="00" callback={callback} />
      )}
    </div>
  );
};

function MyTimer({ expiryTimestamp, callback }: any) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => { console.warn("onExpire called"); callback(true) },
  });
  return (
    <TimerHtml days={days} hours={hours} minutes={minutes} seconds={seconds} callback={true} />
  );
}

function TimerHtml({ seconds, minutes, hours, days }: any) {
  return (
    <ul className="useTimerBox">
      <li className="useTimerBox__item">
        {days} <span>days</span>
      </li>
      <li className="useTimerBox__item">
        {hours}
        <span>hours</span>
      </li>
      <li className="useTimerBox__item">
        {minutes} <span>minutes</span>
      </li>
      <li className="useTimerBox__item">
        {seconds} <span>seconds</span>
      </li>
    </ul>
  );
}
export default TimerSection;
