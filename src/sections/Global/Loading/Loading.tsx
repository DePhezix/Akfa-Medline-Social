import { useBoundStore } from '../../../store/Store.js';
import './Loading.scss'
import LoadingImage from "/images/loading.png";

function Loading() {
const isLoading = useBoundStore(state => state.loading)
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