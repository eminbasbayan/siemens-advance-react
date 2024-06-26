import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logoutUser());
    toast.warn("Çıkış işlemi başarıyla gerçekleşti!", {
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  return (
    <header className="fixed w-full top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </NavLink>
          <div className="flex items-center lg:order-2">
            {user ? (
              <div className="flex gap-2 items-center">
                <strong>{user.username}</strong>
                <button
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 !bg-red-700"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                className="text-gray-800 dark:text-white  hover:bg-red-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? `${linkClasses} !text-white` : linkClasses
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? `${linkClasses} !text-white` : linkClasses
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? `${linkClasses} !text-white` : linkClasses
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? `${linkClasses} !text-white` : linkClasses
                  }
                >
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? `${linkClasses} !text-white` : linkClasses
                  }
                >
                  Cart{" "}
                  <span
                    className="w-4 h-4
                  rounded-full
                  text-white
                  bg-red-600 inline-flex 
                  items-center justify-center text-xs
                  absolute -top-1 -right-4
                  "
                  >
                    {cartItems.length}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

const linkClasses =
  "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 relative";
