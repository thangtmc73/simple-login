import { useContext } from "react";
import AuthenContext from "../AuthenContext";

export default function useAuthen() {
  return useContext(AuthenContext);
}