import { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import AuthorisationContextProvider from "../Context/AuthorisationContext";
import { Navbar } from "flowbite-react";

function Nav(props) {
  const navegtion = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);

  function LogOut() {
    setToken(null);
    localStorage.removeItem("token");
    navegtion("/login");
  }
  return (
    <Navbar>
      <Link to="/">
        {" "}
        <img src={logo} alt="logo" />{" "}
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {token ? (
          <>
            <ul className=" flex flex-wrap gap-6 mt-4 lg:mt-0 justify-center items-center gap-x-5 font-semibold">
              <li className="text-sm">
                {" "}
                <AuthorisationContextProvider Role={["user"]}>
                  <NavLink className="transition-all" to="/home">
                    {" "}
                    Home{" "}
                  </NavLink>{" "}
                </AuthorisationContextProvider>
              </li>

              <li className="text-sm">
                {" "}
                <NavLink className="transition-all" to="/products">
                  {" "}
                  Products{" "}
                </NavLink>{" "}
              </li>
              <li className="text-sm">
                {" "}
                <NavLink className="transition-all" to="/categories">
                  {" "}
                  Categories{" "}
                </NavLink>{" "}
              </li>
              <li className="text-sm">
                {" "}
                <NavLink className="transition-all" to="/brands">
                  {" "}
                  Brands{" "}
                </NavLink>{" "}
              </li>
              <li className="text-sm">
                {" "}
                <NavLink className="transition-all" to="/wishlist">
                  {" "}
                  wishlist{" "}
                </NavLink>{" "}
              </li>
              <li className="text-sm">
                {" "}
                <NavLink className="transition-all relative" to="/cart">
                  {" "}
                  Cart{" "}
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-5 -end-4 dark:border-gray-900">
                    {numOfCartItems}
                  </div>
                </NavLink>{" "}
              </li>
            </ul>
          </>
        ) : null}

        <ul className=" flex mt-4 lg:mt-0 justify-center items-center gap-x-5 font-semibold">
          <li className="text-sm">
            <Link to="/">
              {" "}
              <i className="fa fa-brands fa-instagram "></i>{" "}
            </Link>{" "}
          </li>
          <li className="text-sm">
            <Link to="/">
              {" "}
              <i className="fa fa-brands fa-facebook "></i>{" "}
            </Link>{" "}
          </li>
          <li className="text-sm">
            <Link to="/">
              {" "}
              <i className="fa fa-brands fa-tiktok "></i>{" "}
            </Link>{" "}
          </li>
          <li className="text-sm">
            <Link to="/">
              {" "}
              <i className="fa fa-brands fa-twitter "></i>{" "}
            </Link>{" "}
          </li>
          <li className="text-sm">
            <Link to="/">
              {" "}
              <i className="fa fa-brands fa-linkedin "></i>{" "}
            </Link>{" "}
          </li>
          <li className="text-sm">
            <Link to="/">
              {" "}
              <i className="fa fa-brands fa-youtube "></i>{" "}
            </Link>{" "}
          </li>
        </ul>

        <ul className=" flex mt-4 lg:mt-0 justify-center items-center gap-x-5 font-semibold">
          <li className="text-sm">
            {!token ? (
              <>
                <Link to="/login" className="btn bg-slate-400 text-white">
                  Login
                </Link>
                <Link to="/register" className="btn bg-slate-400 text-white">
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={LogOut}
                  className="btn bg-slate-400 text-white"
                >
                  LogOut
                </button>
              </>
            )}
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
