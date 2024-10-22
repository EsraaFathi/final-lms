import FirstSec from "../components/home/FirstSec";
import SecondSec from "../components/home/SecondSec";
import CategorySec from "../components/home/CategorySec";
import RecentCourses from "../components/courseslist/RecentCourses";

const HomePage = () => {
  return (
    <div className="pt-14 ">
      <FirstSec />
      <SecondSec />
      <CategorySec />
      <RecentCourses />
    </div>
  );
};

export default HomePage;
