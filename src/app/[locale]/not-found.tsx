import Link from "next/link";

const NotFound = async () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href={"/"}>Home Page</Link>
      </p>
    </div>
  );
};

export default NotFound;
