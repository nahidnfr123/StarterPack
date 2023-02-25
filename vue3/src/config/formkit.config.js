import {generateClasses} from '@formkit/themes'
import {genesisIcons} from "@formkit/icons"
import formKitTheme from "@/config/formKitTheme";

const formKitConfig = {
  icons: {
    ...genesisIcons
  },
  config: {
    classes: generateClasses(formKitTheme)
  }
}
export default formKitConfig
