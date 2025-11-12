import './Loading.scss'
import { LoadingContext } from '../../../contexts/LoadingContext.js'
import { useContext } from 'react'
import LoadingImage from "/images/loading.png";

function Loading() {
    const { isLoading } = useContext(LoadingContext)
    return (
      <div
        className={`LoadingContainer ${
          isLoading
            ? "LoadingContainer--loading"
            : "LoadingContainer--not-loading"
        }`}
      >
        <img src={LoadingImage} alt="loading" />
      </div>
    ); 
}

export default Loading