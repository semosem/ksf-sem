import { Drawer, Button, Input } from "@material-ui/core";

const LoginForm = ({
  showLoginForm,
  setShowLoginForm,
  handleChange,
  handleLogin,
  loading,
  invalidate
}) => {
  return (
    <section className="loginForm__container">
      <Drawer
        classes={{ root: "Drawer" }}
        anchor="top"
        open={showLoginForm}
        onClose={() => setShowLoginForm(!showLoginForm)}
      >
        <div className="Form__Drawer">
          <div className="content">
            {invalidate && (
              <span className="error">
                Something went wrong, please try again
              </span>
            )}

            <form class="login-form">
              <input
                name="username"
                type="email"
                placeholder="username"
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
              <button onClick={e => handleLogin(e)}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default LoginForm;
