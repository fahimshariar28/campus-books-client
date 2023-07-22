import { Link } from "react-router-dom";
import logo from "/logo.png";
const Footer = () => {
  return (
    <footer className="footer mt-3 p-10 bg-base-200 text-base-content">
      <div>
        <img className="w-36" src={logo} alt="" />
        <br />
        <p className="font-bold">©Campus Books 2023</p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/colleges" className="link link-hover">
          Colleges
        </Link>
        <Link to="/admission" className="link link-hover">
          Admission
        </Link>
        <Link to="/mycollege" className="link link-hover">
          My College
        </Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
