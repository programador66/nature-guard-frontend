import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import type { RootState, AppDispatch } from "../../store";
import { logout } from "../../store/slices/authSlice";
import Logo from "../LogoAmbiental";

import {
  NavbarWrapper,
  NavLeft,
  NavCenter,
  NavLink,
  NavRight,
  UserChip,
  Divider,
  LogoutButton,
  NavButtonOutline,
  NavButtonPrimary,
} from "./styles";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <NavbarWrapper>
      <NavLeft>
        <Logo />
      </NavLeft>

      <NavCenter>
        {!isAuthenticated && (
          <NavLink
            className={
              location.pathname === "/reports-list-page" ? "active" : ""
            }
            onClick={() => navigate("/reports-list-page")}
          >
            <FormatListBulletedIcon fontSize="small" />
            Denúncias
          </NavLink>
        )}

        {isAuthenticated && (
          <NavLink
            className={location.pathname === "/my-reports" ? "active" : ""}
            onClick={() => navigate("/my-reports")}
          >
            <BookmarkBorderIcon fontSize="small" />
            Minhas Denúncias
          </NavLink>
        )}

        <NavLink
          className={location.pathname === "/create-report" ? "active" : ""}
          onClick={() => navigate("/create-report")}
        >
          <AddCircleOutlineIcon fontSize="small" />
          Nova denúncia
        </NavLink>
      </NavCenter>

      <NavRight>
        {isAuthenticated ? (
          <>
            <UserChip>
              <PersonIcon />
              {user?.name ?? "Usuário"}
            </UserChip>

            <Divider />

            <LogoutButton onClick={handleLogout}>
              <LogoutIcon />
              Sair
            </LogoutButton>
          </>
        ) : (
          <>
            <NavButtonOutline onClick={() => navigate("/register")}>
              Criar conta
            </NavButtonOutline>
            <NavButtonPrimary onClick={() => navigate("/login")}>
              Entrar
            </NavButtonPrimary>
          </>
        )}
      </NavRight>
    </NavbarWrapper>
  );
}
