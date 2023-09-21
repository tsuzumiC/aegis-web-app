import "./CharacterNode.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";
import { ICharacter } from "content/characters/Characters";
import { Node } from "reactflow";

export interface ICharacterNodeProps extends ICharacter {}

type CharacterNodeProps = Node<ICharacterNodeProps>;

const CharacterNode: React.FC<CharacterNodeProps> = (props) => {
    const { data } = props;

    const _image = {
        ref: getCharacterImagePath(data.path, "treeAvatar"),
        alt: data.name,
    };
    return (
        <div className="character-node">
            <img
                className="character-node--image"
                src={getLocalFilePath(_image?.ref)}
                alt={_image.alt}
            />
            <div
                className="character-node--name"
                style={{ backgroundColor: "" }}
            >
                {data.name}
            </div>
        </div>
    );
};

export default CharacterNode;
