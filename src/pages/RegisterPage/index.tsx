import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { register } from "../../service/authService";
import { createReport } from "../../service/reportService";
import { setCredentials } from "../../store/slices/authSlice";
import { clearDraft } from "../../store/slices/reportSlice";
import type { RootState, AppDispatch } from "../../store";
import Loader from "../../components/Loader";
import SuccessModal from "../../components/ModalSuccess";

import {
  Container,
  TopBar,
  TopBarLink,
  BackButton,
  FormWrapper,
  Form,
  Title,
  Label,
  InputWrapper,
  Input,
  InputWithIcon,
  EyeButton,
  Hint,
  FieldGroup,
  Button,
  ErrorText,
  ToggleRow,
  ToggleLabel,
  ToggleSwitch,
} from "./styles";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  password: Yup.string()
    .min(8, "Deve conter ao menos 8 caracteres")
    .required("Senha é obrigatória"),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  isAutonomousMode: Yup.boolean(),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const pendingDraft = useSelector((state: RootState) => state.report.draft);
  const pendingSubmit = useSelector((state: RootState) => state.report.pendingSubmit);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmationPassword: "",
      isAutonomousMode: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError("");
      try {
        const { data } = await register(values);
        dispatch(setCredentials(data));

        if (pendingSubmit && pendingDraft) {
          setIsLoadingReport(true);
          await Promise.all([
            createReport(pendingDraft),
            new Promise((resolve) => setTimeout(resolve, 3000)), // TODO: remover em prod
          ]);
          dispatch(clearDraft());
          setIsLoadingReport(false);
          setShowSuccessModal(true);
        } else {
          navigate("/");
        }
      } catch (err: unknown) {
        console.log("Erro completo:", err);
        console.log("Response data:", (err as { response?: { data?: unknown } })?.response?.data);
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "Erro ao criar conta. Tente novamente.";
        setApiError(message);
        setIsLoadingReport(false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isLoadingReport} />

      <Container>
        <TopBar>
          <BackButton type="button" onClick={() => navigate("/")}>
            <ArrowBackIcon />
            Início
          </BackButton>
          <span>
            Já tem uma conta?{" "}
            <TopBarLink onClick={() => navigate("/login")}>Entrar</TopBarLink>
          </span>
        </TopBar>

        <FormWrapper>
          <Form as="form" onSubmit={formik.handleSubmit}>
            <Title>Criar uma conta</Title>

            {/* NAME */}
            <FieldGroup>
              <Label htmlFor="name">Nome completo</Label>
              <InputWrapper>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  {...formik.getFieldProps("name")}
                />
              </InputWrapper>
              {formik.touched.name && formik.errors.name && (
                <ErrorText>{formik.errors.name}</ErrorText>
              )}
            </FieldGroup>

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <FieldGroup>
              <Label htmlFor="password">Senha</Label>
              <InputWrapper>
                <InputWithIcon
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha"
                  {...formik.getFieldProps("password")}
                />
                <EyeButton
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </EyeButton>
              </InputWrapper>
              <Hint>Deve conter ao menos 8 caracteres</Hint>
              {formik.touched.password && formik.errors.password && (
                <ErrorText>{formik.errors.password}</ErrorText>
              )}
            </FieldGroup>

            {/* CONFIRM PASSWORD */}
            <FieldGroup>
              <Label htmlFor="confirmationPassword">Confirme sua senha</Label>
              <InputWrapper>
                <InputWithIcon
                  id="confirmationPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirme a sua senha"
                  {...formik.getFieldProps("confirmationPassword")}
                />
                <EyeButton
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </EyeButton>
              </InputWrapper>
              {formik.touched.confirmationPassword &&
                formik.errors.confirmationPassword && (
                  <ErrorText>{formik.errors.confirmationPassword}</ErrorText>
                )}
            </FieldGroup>

            {/* ANONYMOUS MODE TOGGLE */}
            <ToggleRow>
              <ToggleLabel>
                <span>Modo anônimo</span>
                <span>Suas denúncias não exibirão seu nome</span>
              </ToggleLabel>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  id="isAutonomousMode"
                  checked={formik.values.isAutonomousMode}
                  onChange={(e) =>
                    formik.setFieldValue("isAutonomousMode", e.target.checked)
                  }
                />
                <span />
              </ToggleSwitch>
            </ToggleRow>

            {apiError && (
              <ErrorText style={{ marginTop: 8 }}>{apiError}</ErrorText>
            )}

            <Button type="submit" disabled={formik.isSubmitting || isLoadingReport}>
              {formik.isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </Form>
        </FormWrapper>
      </Container>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/reports-list-page");
        }}
        onNew={() => {
          setShowSuccessModal(false);
          navigate("/create-report");
        }}
        onTrack={() => {
          setShowSuccessModal(false);
          navigate("/reports-list-page");
        }}
      />
    </>
  );
}
