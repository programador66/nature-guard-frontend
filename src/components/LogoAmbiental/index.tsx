
import { Container } from "./styles"

import logoLight from '../../assets/logo-ambiental.svg';
import logoDark from '../../assets/logo-ambiental-dark.svg';

interface LogoProps {
  dark?: boolean;
}

export default function Logo({ dark }: LogoProps) {
  return (<Container src={dark ? logoDark : logoLight} />)
}
