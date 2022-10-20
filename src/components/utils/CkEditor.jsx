import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//reduxx

import {
  getCkEditorContent,
  getCkEditorImage,
} from "../../features/ckeditor/CkEditorSlice";

import { useDispatch } from "react-redux";
import { setCkEditorContent } from "../../features/articles/ArticlesSlice";

const API_URL = "http://localhost:5001/";
const UPLOAD_ENDPOINT = "upload_files";

const CkEditor = ({value}) => {
  const dispatch = useDispatch();

  function UploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          let body = new FormData();
          loader.file.then((file) => {
            const base64 = loader.data;
            body.append("files", base64);
            body.append("username", "abc123");

            console.log("body", base64);
            let headers = new Headers();
            headers.append("Origin", "http://localhost:5001");
            headers.append("Content-Type", "application/json");

            console.log("headers", headers);
            fetch(`${API_URL}${UPLOAD_ENDPOINT}`, {
              method: "POST",

              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ base64: base64 }),
            })
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                // dispatch(setCkEditorContent(res.url));
                resolve({
                  default: res.url,
                });
              })
              .catch((err) => {
                console.log("error", err);
                reject(err);
              });
          });
        });
      },
    };
  }

  function UploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return UploadAdapter(loader);
    };
  }

  return (
    <div className="App">
      <h2 className="mb-5 font-semibold">Content</h2>

      <CKEditor
        config={{
          extraPlugins: [UploadPlugin],
        }}
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          var data = editor.getData();
          //   console.log(editor);
          console.log({ event, editor, data });
          dispatch(setCkEditorContent(data));
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default CkEditor;
