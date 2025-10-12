
import { Form } from 'react-router';
import LoginService from '../service/LoginService';

function handleLogin(credentials) {
  // Implement login logic here, e.g., call an API and handle authentication
  new LoginService().login(credentials.email, credentials.password)
    .then(response => {
      if (response.success) {
        console.log('Login successful');
      } else {
        console.log('Login failed:', response.message);
      }
    });
}

function LoginPage() {
  return (
    <>
      Login Page
      <Form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const credentials = {
              email: formData.get('email'),
              password: formData.get('password')
          };
          handleLogin(credentials);
      }}>
          <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
          </div>
          <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
      </Form>
    </>
  );
}

export default LoginPage;