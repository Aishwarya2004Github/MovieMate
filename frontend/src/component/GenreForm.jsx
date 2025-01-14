const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-6 bg-gradient-to-r from-teal-100 to-teal-300 rounded-lg shadow-lg max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="genre-input"
            className="block text-xl font-semibold text-gray-800 mb-3"
          >
            Genre Name
          </label>
          <input
            id="genre-input"
            type="text"
            className="py-3 px-5 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-teal-400 focus:border-teal-500 transition duration-300 ease-in-out"
            placeholder="Write genre name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
