import { Link } from "react-router-dom";

function Copyright() {
  return (
    <div className="font-medium text-gray-800">
      <p className=" ">
        All Rights Reserved | &copy; <span>{new Date().getFullYear()}</span> Diet Care
      </p>
      <p>
        Designed by{" "}
        <Link
          to="https://www.instagram.com/eng_eslam_gamal2?igsh=cTg3Y3JodTAyMWg1"
          target="_blank"
          className="focus text-red"
        >
          Eslam Gamal
        </Link>
      </p>
    </div>
  );
}

export default Copyright;
