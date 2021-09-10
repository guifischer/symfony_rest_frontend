import React, { useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import { GET } from "../helper/api";

export default function Wrapper(props) {
  const [token, setToken] = useGlobal("token");
  const history = useHistory();

  const logout = async () => {
    await GET("logout");

    sessionStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    setToken(null);
    history.push("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="-ml-4 my-6 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Users List</h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              onClick={logout}
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
}
