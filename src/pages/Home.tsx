import Banner from "../components/home/banner/Banner";
import Collection from "../components/home/collection/Collection";
import NewArrivals from "../components/home/new_arrivals/NewArrivals";
import Suggestion from "../components/home/suggestion/Suggestion";
import Trending from "../components/home/trending/Trending";
import VideoPromote from "../components/home/video_promote/VideoPromote";

export default function Home() {
  return (
    <>
      <Banner />
      <Suggestion />
      <NewArrivals />
      <VideoPromote />
      <Trending />
      <Collection />
    </>
  );
}
