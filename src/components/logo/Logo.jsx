import { Link } from "react-router-dom";
import logoWhite from "../../images/logo/logooo.png" ;
import logoBlack from "../../images/logo/123.jpg";

function Logo({ size = "w-full", type = "white" }) {
  return (
    <Link to="/Home" className="focus inline-block">
      <img
        src={`${type === "black" ? logoBlack : logoWhite}`}
        alt="Fitness Care logo"
        className={`h-auto ${size}`}
      />
    </Link>
  );
}

export default Logo;
