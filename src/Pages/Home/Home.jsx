import Gallery from "./Gallery/Gallery";
import PopularColleges from "./PopularColleges/PopularColleges";
import Research from "./Research/Research";

const Home = () => {
  return (
    <div>
      <PopularColleges />
      <Gallery />
      <Research />
    </div>
  );
};

export default Home;
