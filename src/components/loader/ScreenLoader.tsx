import "./ScreenLoader.css";
const ScreenLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="content-loader">
        <div className="bars-loader">
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
        </div>
        <div className="bars-loader">
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
          <div className="bar-loader"></div>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;
