import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Select from "react-tailwindcss-select";
import { setInterestTags } from "../../features/articles/ArticlesSlice";

const options = [
  {
    value: "education",
    label: "Education",
  },
  {
    value: "entertainmentShopping",
    label: "Entertainment/Shopping",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "fitness",
    label: "Fitness",
  },
  {
    value: "foodDiet",
    label: "Food/Diet",
  },
  {
    value: "gardening",
    label: "Gardening",
  },
  {
    value: "healthWellness",
    label: "Health/Wellness",
  },
  {
    value: "homeFamily",
    label: "Home/Family",
  },
  {
    value: "relationships",
    label: "Relationships",
  },
];

const SingleAutocomplete = ({ value }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(null);

  const [defaultSelected, setDefaultSelected] = useState(null);

  useEffect(() => {
    const data = options?.filter((object1) => {
      return value?.some((object2) => {
        return object1.value === object2;
      });
    });

    setDefaultSelected(data);
  }, [value]);

  const handleChange = (values) => {
    setSelected(values);
    dispatch(setInterestTags(values));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <label className="font-semibold">General Interest Tags</label>
      <Select
        value={!selected ? defaultSelected : selected}
        onChange={handleChange}
        options={options}
        isMultiple
      />
    </div>
  );
};

export default SingleAutocomplete;
