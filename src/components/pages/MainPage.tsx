import { Helmet } from "react-helmet-async";
import RandomChar from "../RandomChar/RandomChar";
import CharSection from "../sections/CharSection/CharSection";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information Portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar />
      <CharSection />
    </>
  );
};

export default MainPage;
