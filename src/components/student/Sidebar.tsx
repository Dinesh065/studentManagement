import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      <div>
        <button
          type="button"
          onClick={() => navigate("/students")}
          className={`sidebar-button ${isActive("/students") ? "active" : ""}`}
        >
          Students Page
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-button"
        >
          Logout
        </button>
      </div>
      <style>
        {`
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100%;
            background-color: #F5DEB3;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            box-sizing: border-box;
            transition: width 0.3s ease-in-out;
          }
          .sidebar-button {
            width: 100%;
            padding: 10px;
            background-color: #ff7e5f;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 10px;
            transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
          }
          .sidebar-button:hover {
            background-color: #ff6347;
            transform: scale(1.05);
          }
          .sidebar-button:focus {
            outline: none;
            transform: scale(1.05);
          }
          .sidebar-button.active {
            background-color: #ff6347;
          }
          @media (max-width: 768px) {
            .sidebar {
              width: 200px;
            }
          }
          @media (max-width: 480px) {
            .sidebar {
              width: 150px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;