
import { LoaderContainer, Loading, LoadingImg } from './styles';
import Load from '../../assets/loading.svg';
import { useState } from 'react';

export default function Loader() {
  const [isLoading] = useState(false);

  return (

      isLoading && (
        <LoaderContainer>
          <Loading>
            <LoadingImg src={Load} />
          </Loading>
        </LoaderContainer>
      )
  
  );
}