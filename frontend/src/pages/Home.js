import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem('collectionPreviewData')
    if(localData){
      const resultJson = JSON.parse(localData);  
      navigate(`/collection/${resultJson[0].cid}`)
    }
  }, [])

  return (
    <div id='collections-container'className='container'>
      <h1>Make a collection to get started!</h1>
    </div>
  );
}

export default Home;
