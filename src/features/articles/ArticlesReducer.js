import axios from "axios";
import { toCamelCase } from "../../utils/ToCamelCase";

const get_articles = async () => {
  const response = await axios.get("http://localhost:5001/articles");

  return response.data;
};

const get_single_articles = async (id) => {
  const response = await axios.get("http://localhost:5001/articles/" + id);

  return response.data;
};

//update
const update_article = async (body) => {
  console.log(body);
  const personal_tags_values = body.persona_tag.map((item) => {
    if (item.value) {
      return item.value;
    } else {
      return item;
    }
  });

  const interest_tags_values = body.interest_tags.map((item) => {
    if (item.value) {
      return item.value;
    }
    return item;
  });

  const life_stage_tag_values = body.life_stage_tag.map((item) => {
    if (item.value) {
      return item.value;
    } else {
      return item;
    }
  });

  const {
    _id,
    type,
    pillar,
    title,
    header_image,
    header_image_mobile,
    author,
    by_line,
    header,
    sub_header,
    source_url,
    banner_image,
    banner_link,
    life_stage_tag,
    persona_tag,
    interest_tags,
    point,
    duration,
    content,
    img,
    publish,
  } = body;
  const data = {
    _id,
    type: body.type.name,
    pillar: body.pillar.name,
    title,
    header_image,
    header_image_mobile,
    author,
    by_line,
    header,
    sub_header,
    source_url,
    banner_image,
    banner_link,
    life_stage_tag: life_stage_tag_values,
    persona_tag: personal_tags_values,
    interest_tags: interest_tags_values,
    point,
    duration,
    content,
    img,
    publish,
  };
  const response = await axios
    .post("http://localhost:5001/article/update", data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

//create
const create_article = async (body) => {
  const personal_tags_values = body.persona_tag.map((item) => {
    return item.value;
  });

  const interest_tags_values = body.interest_tags.map((item) => {
    return item.value;
  });

  const life_stage_tag_values = body.life_stage_tag.map((item) => {
    return item.value;
  });

  const {
    type,
    pillar,
    title,
    header_image,
    header_image_mobile,
    author,
    by_line,
    header,
    sub_header,
    source_url,
    banner_image,
    banner_link,
    life_stage_tag,
    persona_tag,
    interest_tags,
    point,
    duration,
    content,
    img,
    publish,
  } = body;
  const data = {
    type: toCamelCase(body.type.name),
    pillar: toCamelCase(body.pillar.name),
    title,
    header_image,
    header_image_mobile,
    author,
    by_line,
    header,
    sub_header,
    source_url,
    banner_image,
    banner_link,
    life_stage_tag: life_stage_tag_values,
    persona_tag: personal_tags_values,
    interest_tags: interest_tags_values,
    point,
    duration,
    content,
    img,
    publish,
  };
  const response = await axios
    .post("http://localhost:5001/upload/article", data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

const articlesService = {
  get_articles,
  create_article,
  get_single_articles,
  update_article,
};

export default articlesService;
