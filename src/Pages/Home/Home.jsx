import Gallery from "./Gallery/Gallery";
import PopularColleges from "./PopularColleges/PopularColleges";
import Research from "./Research/Research";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <PopularColleges />
      <Gallery />
      <Research />
      <Reviews />
    </div>
  );
};

export default Home;
