import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../css/Collection.css'
import VideoGamePreview from "../components/VideoGamePreview";

const Collection = () => {
    const { collectionId } = useParams();

    const [data, setData] = useState({});

    const [showForm, setShowForm] = useState(false);

    const [editName, setEditName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

      const localData = localStorage.getItem('collectionPreviewData')
      if(localData){
        const resultJson = JSON.parse(localData);

        console.log(resultJson)
        console.log(collectionId)

        const index = resultJson.findIndex((e) => e.cid == collectionId)
        console.log(index)

        if(index === -1){
          navigate("/")
          return
        }
        const name =  resultJson[index].name;

        const data = {
          name: name,
          games: [
            {
              vid: 0,
              banner: 'image.png',
              esrb_rating: 'E',
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam dolore animi quo expedita, dolorum, sit laboriosam alias modi rerum temporibus repellat optio ut cum itaque, repudiandae tempora quis labore nobis!",
              rating: 5,
              price: 60
            },
            {
              vid: 1,
              banner: 'image2.png',
              esrb_rating: 'T',
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam dolore animi quo expedita, dolorum, sit laboriosam alias modi rerum temporibus repellat optio ut cum itaque, repudiandae tempora quis labore nobis!",
              rating: 1,
              price: 45
            },
            {
              vid: 2,
              banner: 'image3.png',
              esrb_rating: 'E 10+',
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam dolore animi quo expedita, dolorum, sit laboriosam alias modi rerum temporibus repellat optio ut cum itaque, repudiandae tempora quis labore nobis!",
              rating: 6,
              price: 10
            },
            {
              vid: 3,
              banner: 'image4.png',
              esrb_rating: 'M',
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam dolore animi quo expedita, dolorum, sit laboriosam alias modi rerum temporibus repellat optio ut cum itaque, repudiandae tempora quis labore nobis!",
              rating: 8,
              price: 11.99
            }
          ]
        };

        setData(data);
      }else{
        navigate("/")
      }
    }, [])

    const setName = (name) => {
      setData({
        "name": name,
        "games": data.games
      })

      setEditName(name);   
      
      updateLocalStorage(name);
    }

    const dontShowForm = () => {
        setShowForm(false);
    }

    const doShowForm = () => {
       setEditName(data.name);
       setShowForm(true);
    }

    const updateLocalStorage = (name) => {
      const localData = localStorage.getItem("collectionPreviewData")
      let resultJson = JSON.parse(localData);
      const index = resultJson.findIndex((e) => e.cid == collectionId)

      console.log(index);
      console.log(data.name)

      resultJson[index] = {
        cid: collectionId,
        name: name,
        numGames: data.games.length,
        totalTimePlayed: resultJson[index].totalTimePlayed
      };

      console.log(resultJson);

      localStorage.setItem("collectionPreviewData", JSON.stringify(resultJson))
      console.log("ADDING TO LOCAL STORAGE")
      window.location.reload()
    }

    const edit = (e) => {
        if(e.target.form[0].value.length !== 0){
          setName(e.target.form[0].value);
        }
        dontShowForm();
    }

    const deleteCollection = () => {
      const localData = localStorage.getItem("collectionPreviewData")
      let resultJson = JSON.parse(localData);
      const index = resultJson.findIndex((e) => e.cid == collectionId)

      resultJson.splice(index, 1);

      localStorage.setItem("collectionPreviewData", JSON.stringify(resultJson))
      window.location.reload();
    }

    const displayForm = () => {
        return (
            <div className="banner">
                <form action="">
                    <input type="text" name="" id="" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    <button className="btn-primary" onClick={(e) => edit(e)}>Edit</button>
                    <button className="btn-gray" onClick={dontShowForm}>Cancel</button>
                </form>
            </div>
        );
    }

    const displayName = () => {
        return (
            <div className="banner">
                <h1>{data.name}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={doShowForm} className="pencil"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="trash" onClick={deleteCollection}><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </div> 
        )
    }

    const deleteGame = (vid) => {
      const copy = [...data.games]
      const results = copy.filter(game => game.vid !== vid);

      setData({
        "name": data.name,
        "games": results
      })
    }

    return (
        <div>
            {showForm ? displayForm(): displayName()}
            <div className="game-display">
                <VideoGamePreview games={data.games} deleteGame={deleteGame}/>
            </div>
        </div>
    )
};

export default Collection;