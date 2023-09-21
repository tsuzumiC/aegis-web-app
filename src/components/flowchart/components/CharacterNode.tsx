import "./CharacterNode.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";
import { ICharacter } from "content/characters/Characters";
import { Gender } from "content/characters/Gender";
import { Node } from "reactflow";

const CharacterColors = {
    [Gender.Female_V]: "#ff66aa",
    [Gender.Female_P]: "#ffaaaa",
    [Gender.Female_VP]: "#ff66ff",
    [Gender.Male_V]: "#aaaaff",
    [Gender.Male_P]: "#66aaff",
    [Gender.Male_VP]: "#aaddff",
};

export interface ICharacterNodeProps extends ICharacter {}

type CharacterNodeProps = Node<ICharacterNodeProps>;

const CharacterNode: React.FC<CharacterNodeProps> = (props) => {
    const { data } = props;

    const _image = {
        ref: getCharacterImagePath(data.path, "treeAvatar"),
        alt: data.name,
    };
    console.log(data.data);

    return (
        <div className="character-node">
            <img
                className="character-node--image"
                src={getLocalFilePath(_image?.ref)}
                alt={_image.alt}
            />
            <div
                className="character-node--name"
                style={{
                    backgroundColor: data.data?.gender
                        ? CharacterColors[data.data.gender]
                        : "#ffffff",
                }}
            >
                {data.name}
            </div>
        </div>
    );
};

export default CharacterNode;
