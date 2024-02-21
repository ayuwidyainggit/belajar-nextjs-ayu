export default function WithAuth(Components) {
  return function WithAuth(props) {
    const isLogin = false;

    if (!isLogin) return <div>Anda harus login</div>;

    return <Components {...props} />;
  };
}
