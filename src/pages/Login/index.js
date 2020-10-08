import React, {useState} from 'react'
import {Image, ActivityIndicator} from 'react-native';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

import { Container, Input, Button, ButtonText } from './styles';

const Login = () => {
  const { signIn, signUp } = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if(!email) return;
    if(!password) return;
    
    setLoading(true);

    console.log("submit", email, password);

    try {
      await signIn({
        email: email,
        password: password,
      });

    } catch (error) {
      console.log(error);
      console.log("Usuário ou senha não confere.");

    } finally {
      setLoading(false);
    }
  }

  async function createUser() {
    if(!email) return;
    if(!password) return;
    
    setLoading(true);

    console.log("submit", email, password);

    try {
      await signUp({
        email: email,
        password: password,
      });

    } catch (error) {
      console.log(error);
      console.log("Usuário ou senha não confere.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Image source={logoImg} />

      <Input 
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="E-mail"
      />

      <Input 
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
      />

      <Button onPress={() => handleSubmit()} >
        { loading ? (
          <ActivityIndicator color="#fff" />
        ):(
          <ButtonText>Acessar</ButtonText>
        )}
      </Button>

      <Button onPress={() => createUser()} >
        { loading ? (
          <ActivityIndicator color="#fff" />
        ):(
          <ButtonText>Cadastrar novo usuário</ButtonText>
        )}
      </Button>

    </Container>
  )
}

export default Login;