import {generateClasses} from '@formkit/themes'
import { genesisIcons } from "@formkit/icons"
import formKitTheme from "~/config/formKitTheme";

export default {
    icons: {
        ...genesisIcons
    },
    config: {
        classes: generateClasses(formKitTheme)
    }
}
