import ActiveBasket from "../../utils/images/AppbarIcons/ActiveBasket.png"
import InactiveBasket from "../../utils/images/AppbarIcons/InactiveBasket.png"
import DarkBasket from "../../utils/images/AppbarIcons/DarkBasket.png"
import ActiveHeart from "../../utils/images/AppbarIcons/ActiveHeart.png"
import InactiveHeart from "../../utils/images/AppbarIcons/InactiveHeart.png"
import DarkHeart from "../../utils/images/AppbarIcons/DarkHeart.png"
import ActiveHome from "../../utils/images/AppbarIcons/ActiveHome.png"
import InactiveHome from "../../utils/images/AppbarIcons/InactiveHome.png"
import DarkHome from "../../utils/images/AppbarIcons/DarkHome.png"
import ActiveProfile from "../../utils/images/AppbarIcons/ActiveProfile.png"
import InactiveProfile from "../../utils/images/AppbarIcons/InactiveProfile.png"
import DarkProfile from "../../utils/images/AppbarIcons/DarkProfile.png"
import ActiveSearch from "../../utils/images/AppbarIcons/ActiveSearch.png"
import InactiveSearch from "../../utils/images/AppbarIcons/InactiveSearch.png"
import DarkSearch from "../../utils/images/AppbarIcons/DarkSearch.png"
import AddInactive from "../../utils/images/AppbarIcons/AddBotom.png"
<<<<<<< HEAD
import FavoriteInactive from "../../utils/images/AppbarIcons/Favorite.png"
=======
>>>>>>> 2b27c1646072dd4f06d62986c206f216eb3d3bf6

const imagePaths = {
    Home: {
      inactive: InactiveHome,
      active: ActiveHome,
      dark: DarkHome,
    },
    Cart: {
      inactive: InactiveBasket,
      active: ActiveBasket,
      dark: DarkBasket,
    },
    Search: {
      inactive: InactiveSearch,
      active: ActiveSearch,
      dark: DarkSearch,
    },
    Wishlist: {
      inactive: InactiveHeart,
      active: ActiveHeart,
      dark: DarkHeart,
    },
    Account: {
      inactive: InactiveProfile,
      active: ActiveProfile,
      dark: DarkProfile,
    },
    Add:{
      inactive: AddInactive,
      //  active: ActiveProfile,
      //  dark: DarkProfile,
    },
<<<<<<< HEAD
    Favorite:{
      inactive: FavoriteInactive,
    }
=======
>>>>>>> 2b27c1646072dd4f06d62986c206f216eb3d3bf6
}

export default imagePaths;