import childrenImg from "../../assets/school-children.webp";
import "./Image-N-Text.css";

const ImageNText = (): JSX.Element => {
  return (
    <div className="relative">
      <img className="image" src={childrenImg}></img>
      <div className="text-over-image">
        <h1 className="title">Welcome to Russell Online Learning</h1>
        <p className="text">To laugh as you learn and enjoy the process</p>
      </div>
    </div>
  );
};

export default ImageNText;
