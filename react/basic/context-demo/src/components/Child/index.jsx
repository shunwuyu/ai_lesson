import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";


const Child = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={theme}>
      Child {theme}
    </div>
  )
}

export default Child;