import NotFoundimg from "../../assets/images/error.svg";

function NotFound(props) {
  return (
    <div className="w-9/12 mx-auto">
      <img src={NotFoundimg} className="w-full" alt="Not fond" />
    </div>
  );
}

export default NotFound;
