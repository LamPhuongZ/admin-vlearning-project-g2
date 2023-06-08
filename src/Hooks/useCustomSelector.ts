import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

type ReducerNameSpace = "userReducer";

const useCustomSelector = (reducerName: ReducerNameSpace) => {
  return useSelector((state: RootState) => {
    return state[reducerName]; // state['userReducer']
  });
};

export default useCustomSelector;
