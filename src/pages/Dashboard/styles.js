import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 36px;
  color: #3a3a3a;
  padding: 20px;
`;

export const Resumo = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ResumoText = styled.Text`
  font-size: 22px;
  color: #3a3a3a;
  margin-bottom: 20px;
`;

export const ResumoTextParagraph = styled.Text`
  font-size: 18px;
  color: #3a3a3a;
`;

export const ResumoTextParagraphBold = styled.Text`
  font-size: 18px;
  color: #3a3a3a;
  font-weight: bold;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  margin-top: 40px;
  border-radius: 5px;
  background-color: #c53030;
  align-items: center;
  justify-content: center;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;