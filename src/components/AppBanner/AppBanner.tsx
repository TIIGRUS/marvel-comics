import "./AppBanner.scss";
import avengers from "../../assets/images/Avengers.png";
import avengersLogo from "../../assets/images/Avengers_logo.png";

const AppBanner = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className="banner">
      <img
        src={avengers}
        alt="Avengers team: Iron Man, Captain America, Thor, Hulk, Black Widow, Spider Man"
        className="banner__image"
      />
      <h2 className="banner__title">
        {children || (
          <>
            New comics every week! <br /> Stay tuned!
          </>
        )}
      </h2>
      <img src={avengersLogo} alt="Marvel Avengers logo" />
    </section>
  );
};

export default AppBanner;
