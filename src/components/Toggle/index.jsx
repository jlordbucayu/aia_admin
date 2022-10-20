import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPublishStatus } from "../../features/articles/ArticlesSlice";

const Toggle = ({status}) => {
const dispatch = useDispatch()
console.log(status)
  const [enabled, setEnabled] = useState(!status);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label class="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => {
                dispatch(setPublishStatus(!enabled))
              setEnabled(!enabled);
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">ON</span>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
