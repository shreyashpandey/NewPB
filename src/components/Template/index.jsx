import HtmlContent from "./HtmlContent";
import { ContextProvider } from "../Context";
import App from "./App";

export default function Template() {

  return (
    <>
      {/* <ContextProvider> */}
        <HtmlContent />

        <App />
      {/* </ContextProvider> */}
    </>
  )

}