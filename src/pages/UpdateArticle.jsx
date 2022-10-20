import React, { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";
import SingleAutocomplete from "../components/AutoComplete/SingleAutocomplete";

import SubmitBtn from "../components/Buttons/SubmitBtn";
import InputForm from "../components/Forms/InputForm";
import SuccessModal from "../components/Modals/SuccessModal";
import Toggle from "../components/Toggle";
import TextField from "../components/TextFields";

import CkEditor from "../components/utils/CkEditor";
import ImageUploader from "../components/utils/ImageUploader";
import {
  create_article,
  get_single_articles,
  resetForm,
  setPillar,
  setPublishStatus,
  setTextFields,
  setType,
  update_article,
} from "../features/articles/ArticlesSlice";
import { setModalSuccess } from "../features/modal/ModalSlice";
import { toCamelCase } from "../utils/ToCamelCase";

const UpdateArticle = () => {
  const dispatch = useDispatch();
  let { _id } = useParams();

  const { form } = useSelector((state) => state.articles);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update_article(form))
      .unwrap()
      .then((res) => dispatch(setModalSuccess(true)))
      .catch((err) => console.log(err));

    // dispatch(resetForm());
  };

  function getParent(arr, value) {
    const data = arr.filter((item) => {
      return toCamelCase(item.name) === value;
    });

    return data[0];
  }

  const pillar = [
    { name: "Healthier life" },
    { name: "Better Life" },
    { name: "Longer Life" },
    { name: "The Life" },
  ];
  const typeOpt = [
    { name: "Listicle" },
    { name: "Infographic" },
    { name: "Video Embeded" },
    { name: "Gallery" },
    { name: "Form" },
  ];

  console.log(getParent(pillar, "healthierLife"));
  const formReducer = (state, event) => {
    let data = {
      ...state,
      [event.target.name]: event.target.value,
    };

    dispatch(setTextFields(data));
    return data;
  };

  const [formData, setFormData] = useReducer(formReducer, {});

  const handleChangeType = (event) => {
    console.log(event);
    dispatch(setType(event));
  };

  const products = [
    {
      image: {
        url: "https://asdasd",
      },

      title: "Sample title",
    },
  ];

  const handleChangePillar = (event) => {
    dispatch(setPillar(event));
  };

  const handleChangeStatus = () => {
    setPublishStatus();
  };

  useEffect(() => {
    return () => {
      dispatch(get_single_articles(_id))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
  }, [_id, dispatch]);

  return (
    <div className="w-full my-[50px]">
      <div className="max-w-[1000px] bg-white m-auto h-screen p-5 flex flex-col gap-10">
        <InputForm
          label={"Type"}
          data={typeOpt}
          handleChange={handleChangeType}
          selectedData={getParent(typeOpt, form.type) || form.type}
        />
        <InputForm
          label={"Pillar"}
          data={pillar}
          handleChange={handleChangePillar}
          selectedData={getParent(pillar, form.pillar) || form.pillar}
        />

        <ImageUploader
          header_image={form.header_image}
          banner_image={form.banner_image}
        />
        <TextField
          label={"Title"}
          name={"title"}
          value={form.title}
          handleChange={setFormData}
        />

        <TextField
          label={"By Line"}
          name={"by_line"}
          value={form.by_line}
          handleChange={setFormData}
        />

        <TextField
          label={"Header"}
          name={"header"}
          value={form.header}
          handleChange={setFormData}
        />

        <TextField
          label={"Sub Header"}
          name={"sub_header"}
          value={form.sub_header}
          handleChange={setFormData}
        />

        <TextField
          label={"Source Url"}
          name={"source_url"}
          value={form.source_url}
          handleChange={setFormData}
        />

        <CkEditor value={form.content} />

        <TextField
          label={"Banner Link"}
          name={"banner_link"}
          value={form.banner_link}
          handleChange={setFormData}
        />
        <AutoComplete value={form.life_stage_tag} child={form.persona_tag} />

        <SingleAutocomplete value={form.interest_tags} />

        <div className="flex gap-5">
          <label className="font-semibold">Publish</label>
          <Toggle
            handleChangeStatus={handleChangeStatus}
            status={form.publish}
          />
        </div>

        <SuccessModal />
        {/* footer */}
        <div>
          <SubmitBtn handleSubmit={handleSubmit} type={"submit"} />
        </div>
      </div>
    </div>
  );
};

export default UpdateArticle;
