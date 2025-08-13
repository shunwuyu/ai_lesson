import { appConfig } from "../config"

const AppHeader = () => {
  return (<header>
    <div>
      {appConfig.appName}
    </div>
  </header>)
}

export default AppHeader