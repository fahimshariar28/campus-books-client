import Gallery from "./Gallery/Gallery";
import PopularColleges from "./PopularColleges/PopularColleges";
import Research from "./Research/Research";
import Reviews from "./Reviews/Reviews";
import Search from "./Search/Search";

const Home = () => {
  return (
    <div>
      <Search />
      <PopularColleges />
      <Gallery />
      <Research />
      <Reviews />
    </div>
  );
};

export default Home;
