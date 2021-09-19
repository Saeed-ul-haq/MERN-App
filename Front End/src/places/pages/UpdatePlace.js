import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import LoadingSpin from "../../shared/components/UIElements/LoadingSpin";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const [identifiedPlace, setidentifiedPlace] = useState();
  const [loadedPlace, setloadedPlace] = useState();
  const [error, setError] = useState()
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(() => {
    fetch(`http://localhost:5000/api/places/${placeId}`)
      .then((response) => response.json())
      .then((res) => {
        setIsLoading(false);
        setloadedPlace(res.data);
        setidentifiedPlace(res.data)
        setFormData(
          {
            title: {
              value: res.data.title,
              isValid: true,
            },
            description: {
              value: res.data.description,
              isValid: true,
            },
          },
          true
        );
      }).catch(err => {
        setError(err.message)
      });
  }, [placeId,setFormData]);

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/places/${placeId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => history.push("/"));
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpin />
      </div>
    );
  }
  if (!identifiedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }


  return (
      <Fragment>
        <ErrorModal error={error} onClear={() => setError(null)} />
   {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
        />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
        />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>

    </form>}
        </Fragment>
  );
};

export default UpdatePlace;
