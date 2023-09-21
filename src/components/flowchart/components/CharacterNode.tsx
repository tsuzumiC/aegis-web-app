import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";
import { ICharacterListItem } from "content/characters/Characters";
import { Node } from "reactflow";

export interface ICharacterNodeProps extends ICharacterListItem {}

type CharacterNodeProps = Node<ICharacterNodeProps>;

const CharacterNode: React.FC<CharacterNodeProps> = (props) => {
    const { data } = props;

    const _image = {
        ref: getCharacterImagePath(data.path, "treeAvatar"),
        alt: data.name,
    };
    return (
        <div>
            <div>{data.name}</div>
            <img src={getLocalFilePath(_image?.ref)} alt={_image.alt} />
        </div>
    );
};

export default CharacterNode;
