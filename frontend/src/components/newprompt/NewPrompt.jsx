import React, { useRef, useState } from 'react'
import './NewPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    dbData: {},
  })
  const endRef = useRef(null)
  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT_URL}
          path={img.dbData?.filePath}
          width='380'
        />
      )}

      <div className='endChat' ref={endRef}></div>
      <form className='newForm'>
        <Upload setImg={setImg} />
        <input id='file' type='file' multiple={false} hidden />
        <input type='text' placeholder='Ask anything...' />
        <button>
          <img src='/arrow.png' alt='' />
        </button>
      </form>
    </>
  )
}

export default NewPrompt
