import SkeletonImage from "../SkeletonImage/SkeletonImage";
import SkeletonText from "../SkeletonText/SkeletonText";
import SkeletonTitle from "../SkeletonTitle/SkeletonTitle";
import "./SkeletonWrapper.scss";

const SkeletonWrapper = () => (
  <div className="skeletonWrapper">
    <SkeletonImage />
    <SkeletonText />
    <SkeletonTitle />
  </div>
);
export default SkeletonWrapper;
