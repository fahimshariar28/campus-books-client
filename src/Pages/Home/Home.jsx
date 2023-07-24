import { Helmet } from "react-helmet-async";
import Gallery from "./Gallery/Gallery";
import PopularColleges from "./PopularColleges/PopularColleges";
import Research from "./Research/Research";
import Reviews from "./Reviews/Reviews";
import Search from "./Search/Search";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Campus Books</title>
      </Helmet>
      <Search />
      <Gallery />
      <PopularColleges />
      <Research />
      <Reviews />
    </div>
  );
};

export default Home;
