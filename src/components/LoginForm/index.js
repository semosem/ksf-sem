import { Drawer, Button, Input } from "@material-ui/core";

const LoginForm = ({
  showLoginForm,
  setShowLoginForm,
  handleChange,
  handleLogin
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
              <button onClick={e => handleLogin(e)}>Sing in</button>
              <p class="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default LoginForm;
