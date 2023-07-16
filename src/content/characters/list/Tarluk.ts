import { ICharacter } from "../Characters";
import { Gender } from "../Gender";

const Tarluk: ICharacter = {
    id: "Tarluk",
    name: "Tarluk",
    avatar: { ref: "/hlaar/Tarluk_treeAvatar.jpg", alt: "Tarluk" },
    mainImage: { ref: "/hlaar/Tarluk.jpg", alt: "Tarluk" },
    gender: Gender.Male_P,
};

export default Tarluk;
