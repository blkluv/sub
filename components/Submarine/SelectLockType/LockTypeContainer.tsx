import FileDetail from "./FileDetail";

const LockTypeContainer = ({ children, title, description }) => {
  return (
    <div>
      <div>
        <h3 className="text-gray-900 font-bold text-2xl">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        {children}
        <FileDetail />
      </div>
    </div>
  );
};

export default LockTypeContainer;
