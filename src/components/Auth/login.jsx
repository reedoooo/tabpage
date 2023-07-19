import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { When } from 'react-if';
import {
  Input,
  Button,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/Auth/authContext.js';

function Login() {
  let authContext = useContext(AuthContext);
  let navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signupMode, setSignupMode] = React.useState(false);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [age, setAge] = useState('');

  const [roleData, setRoleData] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupMode) {
      await authContext.signup(
        username,
        password,
        {
          name,
          age,
        },
        {
          name: roleData, // assuming roleData is a string representing role name
        },
      );
    } else {
      try {
        await authContext.login(username, password);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate('/profile');
    }
  }, [authContext.isLoggedIn, navigate]);

  return (
    <>
      <When condition={authContext.isLoggedIn}>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={authContext.logout}
          maxW="100px"
        >
          Log Out
        </Button>
      </When>

      <When condition={!authContext.isLoggedIn}>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Input
              placeholder="Username"
              name="username"
              size="md"
              onChange={(event) => setUsername(event.target.value)}
            />

            <Input
              placeholder="Password"
              name="password"
              size="md"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />

            {signupMode && (
              <>
                <Input
                  placeholder="Full Name"
                  name="name"
                  size="md"
                  onChange={(event) => setName(event.target.value)}
                />

                <Input
                  placeholder="Role Data"
                  name="roleData"
                  size="md"
                  onChange={(event) => setRoleData(event.target.value)}
                />

                <Input
                  placeholder="Age"
                  name="age"
                  size="md"
                  type="number"
                  onChange={(event) => setAge(event.target.value)}
                />
              </>
            )}

            <Button colorScheme="blue" type="submit" size="md">
              {signupMode ? 'Sign Up' : 'Login'}
            </Button>
          </div>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="signup-mode" mb="0">
              Sign up mode
            </FormLabel>
            <Switch
              id="signup-mode"
              onChange={(e) => setSignupMode(e.target.checked)}
            />
          </FormControl>
        </form>
      </When>
    </>
  );
}

export default Login;
