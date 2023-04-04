import { PlayIcon } from "../../../assets/SvgIcons/SvgIcons";
import "./PlayBtn.scss";

type Props = {
  text?: boolean;
};

const PlayBtn = (props: Props) => {
  return (
    <div className="playBtn">
      <div className="playBtn__btn">
        <PlayIcon />
      </div>
      {props.text && <p className="sub-text mb-0">Watch Video</p>}
    </div>
  );
};

export default PlayBtn;
