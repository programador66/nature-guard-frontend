import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import loginIllustration from "../../assets/login.svg";
import Loader from "../../components/Loader";

import {
  Container,
  Left,
  Right,
  Form,
  Title,
  Subtitle,
  Label,
  FieldGroup,
  InputWrapper,
  Input,
  ForgotLink,
  Button,
  Divider,
  RegisterRow,
  RegisterLink,
  ErrorText,
} from "./styles";

import { login } from "../../service/authService";
import { createReport } from "../../service/reportService";
import { setCredentials } from "../../store/slices/authSlice";
import { clearDraft } from "../../store/slices/reportSlice";
import type { RootState, AppDispatch } from "../../store";

const validationSchema = Yup.object({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pendingDraft = useSelector((state: RootState) => state.report.draft);
  const pendingSubmit = useSelector(
    (state: RootState) => state.report.pendingSubmit
  );

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError("");
      setIsLoading(true);
      try {
        const { data } = await login(values);
        dispatch(setCredentials(data));

        if (pendingSubmit && pendingDraft) {
          await createReport(pendingDraft);
          dispatch(clearDraft());
        }
        navigate("/reports-list-page");
      } catch (err: unknown) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "E-mail ou senha incorretos.";
        setApiError(message);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isLoading} />

      <Container>
        <Left>
          <img src={loginIllustration} alt="Login illustration" />
        </Left>

        <Right>
          <Form as="form" onSubmit={formik.handleSubmit}>
            <Title>Bem vindo de volta 👋</Title>
            <Subtitle>
              Sua voz faz a diferença na proteção do meio ambiente.
              <br />
              Entre na sua conta e continue denunciando.
            </Subtitle>

            <FieldGroup>
              <Label htmlFor="email">E-mail</Label>
              <InputWrapper>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  {...formik.getFieldProps("email")}
                />
              </InputWrapper>
              {formik.touched.email && formik.errors.email && (
                <ErrorText>{formik.errors.email}</ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="password">Senha</Label>
              <InputWrapper>
                <Input
                  id="password"
                  type="password"
                  placeholder="Insira sua senha"
                  {...formik.getFieldProps("password")}
                />
              </InputWrapper>
              {formik.touched.password && formik.errors.password && (
                <ErrorText>{formik.errors.password}</ErrorText>
              )}
              <ForgotLink>Esqueceu a senha?</ForgotLink>
            </FieldGroup>

            {apiError && <ErrorText style={{ marginBottom: 8 }}>{apiError}</ErrorText>}

            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            <Divider>ou</Divider>

            <RegisterRow>
              Você ainda não tem uma conta?{" "}
              <RegisterLink onClick={() => navigate("/register")}>
                Criar conta
              </RegisterLink>
            </RegisterRow>
          </Form>
        </Right>
      </Container>
    </>
  );
}
