<div className="flex items-center mt-4">
<label htmlFor="accessible" className="mr-2 text-sm font-medium text-gray-700">
  Accessible Vehicle
</label>
<div
  onClick={handleAccessibleChange}
  className={`relative inline-block w-10 h-6 cursor-pointer select-none ${
    accessible ? 'bg-indigo-600' : 'bg-gray-300'
  } rounded-full`}
>
  <div
    className={`absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow-md transition-transform transform ${
      accessible ? 'translate-x-4' : 'translate-x-0'
    }`}
  />
</div>
</div>



const [accessible, setAccessible] = useState(false);


const handleAccessibleChange = () => {
  setAccessible(!accessible);
};
