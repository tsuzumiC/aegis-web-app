import { Characters, ICharacter } from "../Characters";
import { Gender } from "../Gender";

const Marnie_Bryne: ICharacter = {
    id: "Marnie_Bryne",
    name: "Marnie Bryne",
    avatar: { ref: "/hlaar/Marnie_Bryne_treeAvatar.jpg", alt: "Marnie Bryne" },
    mainImage: { ref: "/hlaar/Marnie_Bryne.jpg", alt: "Marnie Bryne" },
    gender: Gender.Female_V,
    children: { asMother: [Characters.Alani_Hlaar, Characters.Annie_Hlaar] },
};

export default Marnie_Bryne;
