import {
  Container,
  Card,
  Title,
  Subtitle,
  Input,
  TextArea,
  Select,
  Button,
  Label,
} from "./styles";

function FormDenuncia() {
    return (
           <Container>
            <Card>
                <Title>Fazer denúncia</Title>
    
                    <Subtitle>
                    Informe seu nome e descreva em poucas palavras o ocorrido
                    </Subtitle>
    
                    <Label>Nome completo</Label>
                    <Input placeholder="Ex: Carlos Silva" />
    
                    <Label>Tipo de ocorrido</Label>
                    <Select>
                        <option>Selecione</option>
                        <option>Queimada</option>
                        <option>Alagamento</option>
                        <option>Deslizamento</option>
                        <option>Poluição sonora</option>
                    </Select>
    
                    <Label>Descrição do ocorrido</Label>
                    <TextArea placeholder="Descreva sua denúncia..." />
    
                <Button>Continuar</Button>
            </Card>
        </Container>
        );
}

export default FormDenuncia