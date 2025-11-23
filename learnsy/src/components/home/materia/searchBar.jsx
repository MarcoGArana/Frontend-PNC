import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ value, onChange, fullWidth }) => {
  return (
    <div className={`flex ${fullWidth ? "w-full" : "w-full sm:w-2/3"} relative`}>
      <input
        type="text"
        placeholder="Buscar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border title-font font-light text-[var(--color-border-shadow)] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent px-4 py-2 pr-10"
      />
      <AiOutlineSearch
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-border-shadow)]"
      />
    </div>
  );
};

export default SearchBar;