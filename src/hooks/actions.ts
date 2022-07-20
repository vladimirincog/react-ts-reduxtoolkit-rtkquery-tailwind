import { githubActions } from './../store/gihub/githube.slice';
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"

const actions = {
  ...githubActions
}

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch)
}