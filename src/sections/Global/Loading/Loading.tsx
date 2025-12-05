import { useBoundStore } from '../../../store/Store.js';
import LoadingImage from "/images/loading.avif";
import {gsap, useGSAP} from '../../../gsapConfig.js'
import { useRef } from 'react'

function Loading() {
  const isLoading = useBoundStore(state => state.loading)
  const loadingSpinner = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    gsap.to(loadingSpinner.current, {
      duration: 5,
      repeat: -1,
      rotate: 360,
    })
  })

  return (
      <div
        className={`flex bg-white justify-center items-start w-screen`}
      >
        <img src={LoadingImage} alt="loading" className='w-[100px]' ref={loadingSpinner} />
      </div>
    ); 
}

export default Loading