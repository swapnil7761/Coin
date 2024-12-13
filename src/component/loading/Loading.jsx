import s from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={s.loadingdiv}>
      <div className={s.loader}></div>
    </div>
  );
};

export default Loading;
