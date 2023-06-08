import { useDispatch } from "react-redux";
import { DispatchType } from "../Redux/store";

const useCustomDispatch = () => {
  const dispatch: DispatchType = useDispatch();
  return dispatch;
};

export default useCustomDispatch;
