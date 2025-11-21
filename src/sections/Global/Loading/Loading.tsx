import { useBoundStore } from '../../../store/Store.js';
import LoadingImage from "/images/loading.png";

function Loading() {
const isLoading = useBoundStore(state => state.loading)
  return (
      <div
        className={`flex bg-white justify-center items-start w-screen`}
      >
        <img src={LoadingImage} alt="loading" className='w-[100px] animate-spin' />
      </div>
    ); 
}

export default Loading