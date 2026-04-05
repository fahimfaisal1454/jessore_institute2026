import Slider from "../components/home/Slider";
import NoticeBoard from "../components/home/NoticeBoard";
import CommitteeList from "../components/home/CommitteeList";
import BottomInfoCards from "../components/home/BottomInfoCards";

export default function Home() {
  return (
    <div className="space-y-3">

      <Slider />
      <NoticeBoard />
      <CommitteeList />
      <BottomInfoCards /> 

    </div>
  );
}