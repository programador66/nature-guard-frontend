import {
  Container,
  Header,
  Nav,
  ButtonOutline,
  ButtonPrimary,
  Content,
  Left,
  Tag,
  Title,
  Description,
  Actions,
  Right,
  Image,
} from "./styles";

import Logo from '../../components/LogoAmbiental';

import denuncia from '../../assets/denuncia-01.svg';
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Loader />
        <Header>
            <Logo/>
            <Nav>
            <ButtonOutline>Criar conta</ButtonOutline>
            <ButtonPrimary>Entrar</ButtonPrimary>
            </Nav>
        </Header>

        <Content>
            <Left>
            <Tag>DISK DENÚNCIAS AMBIENTAIS</Tag>

            <Title>
                Ajude a <span>proteger</span> o meio ambiente
            </Title>

            <Description>
                Cada ação conta. Ao denunciar queimadas, enchentes e outros problemas ambientais, você contribui para a preservação do nosso planeta.
            </Description>

            <Actions>
                <ButtonPrimary onClick={() => navigate('/create-report')}>Fazer denúncia</ButtonPrimary>
                <ButtonOutline onClick={() => navigate('/reports-list-page')}>Acompanhar denúncias</ButtonOutline>
            </Actions>
            </Left>

            <Right>
            <Image src={denuncia} />
            </Right>
        </Content>
        </Container>
    );
}

export default MainPage;