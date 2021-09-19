import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";


const UserPlaces = () => {
  const [userPlaces, setuserPlaces] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const userId = useParams().userId;
  const deletePlaceHandler = (id) => {
    const places = userPlaces.filter(place => place._id !== id);
    setuserPlaces(places)
  }
  useEffect(() => {
    setisLoading(true)
    fetch(`http://localhost:5000/api/places/user/${userId}`)
      .then((response) => response.json())
      .then((res) => {
        setisLoading(false)
        console.log("user places ", res.data);
        setuserPlaces(res.data);
      }).catch(err => {
        setisLoading(false)

      });
  }, [userId]);
  return <PlaceList items={userPlaces} isLoading={isLoading} onDeletePlace={deletePlaceHandler} />;
};

export default UserPlaces;
