import "./SkeletonPost.scss";
import SkeletonTitle from "../SkeletonTitle/SkeletonTitle";
import SkeletonText from "../SkeletonText/SkeletonText";

const SkeletonPost = () => (
  <div className="skeletonPost">
    <SkeletonTitle />
    <SkeletonText />
    <SkeletonText />
  </div>
);

export default SkeletonPost;
