import { LoaderContainer, Loading, LoadingImg } from './styles';
import Load from '../../assets/loading.svg';

interface LoaderProps {
  isLoading?: boolean;
}

export default function Loader({ isLoading = false }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <LoaderContainer>
      <Loading>
        <LoadingImg src={Load} />
      </Loading>
    </LoaderContainer>
  );
}
