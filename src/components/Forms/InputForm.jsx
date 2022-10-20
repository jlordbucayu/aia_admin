
import ListBox from "./ListBox";




export default function InputForm({label,data,selectedData,handleChange}) {
  return (
    <div className="flex flex-col w-full gap-3">
      <label className="font-semibold">{label}</label>

      <ListBox data={data} handleChange={handleChange} selectedData={selectedData}/>

     
    </div>
  );
}
