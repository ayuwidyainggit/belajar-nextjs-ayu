import WithAuth from "../WithAuth";

function Content() {
  return <div className="background">content</div>;
}

export default WithAuth(Content);
