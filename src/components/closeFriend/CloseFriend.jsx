import "./closeFriend.css";

export default function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
