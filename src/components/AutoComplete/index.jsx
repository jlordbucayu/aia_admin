import React, { useState, useEffect, useCallback } from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import {
  setInterestTags,
  setLifeStageTags,
  setPersonaTags,
  setTags,
} from "../../features/articles/ArticlesSlice";

const options = [
  {
    value: "bachelor",
    label: "Bachelor",
    child: [
      { value: "explorer", label: "Explore" },
      { value: "leader", label: "Leader" },
      { value: "adventure", label: "Adventure" },
      { value: "mingler", label: "Mingler" },
      { value: "resilient", label: "Resilient" },
      { value: "chill", label: "Chill" },
    ],
  },

  {
    value: "newlyMarried",
    label: "Newly Married",
    child: [
      { value: "spiritedCouple", label: "Spirited Couple" },
      { value: "powerCouple", label: "Power Couple" },
      { value: "carefreeCouple", label: "Carefree Couple" },
      { value: "notableCouple", label: "Notable Couple" },
      { value: "determinedCouple", label: "Determined Couple" },
    ],
  },

  {
    value: "fullNest1",
    label: "Full Nest 1",
    child: [
      { value: "activeFamily", label: "Active Family" },
      { value: "ambitiousFamily", label: "Ambitious Family" },
      { value: "easygoingFamily", label: "Easy-going Family" },
      { value: "sociableFamily", label: "Sociable Family" },
      { value: "committedFamily", label: "Committed Family" },
    ],
  },

  {
    value: "fullNest2",
    label: "Full Nest 2",
    child: [
      { value: "enthusiasticFamily", label: "Ethusiastic Family" },
      { value: "innovativeFamily", label: "Innovative Family" },
      { value: "laid-backFamily", label: "Welcoming Family" },
      { value: "welcomingFamily", label: "Laid-back Family" },
      { value: "unshakeableFamily", label: "Unshakeable Family" },
    ],
  },

  {
    value: "emptyNest",
    label: "Empty Nest",
    child: [
      { value: "wanderer", label: "Wanderer" },
      { value: "creative", label: "Creative" },
      { value: "serene", label: "Serene" },
      { value: "merrymaker", label: "Merrymaker" },
      { value: "headstrong", label: "Headstrong" },
    ],
  },
  {
    value: "solitary",
    label: "Solitary",
    child: [
      { value: "unstoppable", label: "Unstoppable" },
      { value: "inspired", label: "Inspired" },
      { value: "vigorous", label: "Vigorous" },
      { value: "peaceful", label: "Peaceful" },
      { value: "lively", label: "Lively" },
      { value: "unwavering", label: "Unwavering" },
    ],
  },
];

const AutoComplete = ({ value, child }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [childSelected, setChildSelected] = useState(null);
  const [childOptions, setChildOptions] = useState([]);

  const [defaultSelected, setDefaultSelected] = useState([]);
  const [defaultSelectedChild, setDefaultSelectedChild] = useState([] || null);
  const [defaultSelectedOptions, setDefaultSelectedOptions] = useState(
    [] || null
  );

  useEffect(() => {

    const propVal = value || [];
    const propChild = child || []
    if ((propVal?.length > 0 || 0) && (propChild?.length > 0 || 0)) {
      const data = options?.filter((object1) => {
        return value?.some((object2) => {
          return object1.value === object2;
        });
      });

      setDefaultSelected(data);

      const childs = options.map((item) => {
        return item.child;
      });

      const childOpt = childs?.filter((item) => {
        return item?.some((object2) => {
          return child?.includes(object2.value);
        });
      });

      const selectedValues = childOpt[0]?.filter((item) => {
        return child?.includes(item.value);
      });

      setDefaultSelectedChild(selectedValues);
      setDefaultSelectedOptions(childOpt[0]);
    }
  }, [child, value]);

  const handleChange = (value) => {
    setSelected(value);

    let arr = [];
    const childs = value.map((item) => {
      return item.child;
    });

    childs.map((item) => {
      arr.push(item);
    });
    var combinedChildOpt = arr.reduce(
      (accumulator, obj) => [...accumulator, ...obj],
      []
    );

    dispatch(setLifeStageTags(value));
    setChildOptions(combinedChildOpt);
  };

  const handleChildChange = (value) => {
    setChildSelected(value);
    dispatch(setPersonaTags(value));
  };

  return (
    <div className="flex gap-5 w-full">
      <div className="w-full flex flex-col gap-5">
        <label className="font-semibold">Life Stage Tags</label>
        <Select
          value={!selected ? defaultSelected : selected}
          onChange={handleChange}
          options={options}
          isMultiple
        />
      </div>

      <div className="w-full flex flex-col gap-5">
        <label className="font-semibold">Persona Tags</label>
        <Select
          value={!childSelected ? defaultSelectedChild : childSelected}
          onChange={handleChildChange}
          options={
            childOptions?.length === 0 ? defaultSelectedOptions : childOptions
          }
          isMultiple
        />
      </div>
    </div>
  );
};

export default AutoComplete;
