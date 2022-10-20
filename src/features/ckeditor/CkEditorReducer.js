import axios from "axios";

const submit_form = async (body) => {
    console.log('body',body)
  const response = await axios
    .post("http://localhost:5001/upload/article", body)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

const ckeditorService = {
  submit_form,
};

export default ckeditorService;
