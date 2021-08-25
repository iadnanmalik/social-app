import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { withAuth } from "../../HOC/withAuth";

const TopBarComponent = ({ user, setUser }) => {
  const history = useHistory();
  const handleSubmit = () => {
    localStorage.removeItem("token");
    setUser({});
    history.push("/login");
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Socializer</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {user.name ? (
            <Link
              to="/posts"
              style={{ textDecoration: "none", color: "white" }}
              className="topbarLink"
            >
              <span>Posts</span>
            </Link>
          ) : null}
          <Link
            to="/profiles"
            style={{ textDecoration: "none", color: "white" }}
            className="topbarLink"
          >
            <span>Community</span>
          </Link>
          {user.name ? <button onClick={handleSubmit}>Logout</button> : null}
        </div>
      </div>
    </div>
  );
};

export const Topbar = withAuth(TopBarComponent);
