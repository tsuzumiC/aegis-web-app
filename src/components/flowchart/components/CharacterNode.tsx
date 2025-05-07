import "./CharacterNode.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";
import { ICharacter } from "content/characters/Character";
import { Gender } from "content/characters/Gender";
import { CustomNode } from "../utility/NodeUtility";
import { Handle, Position } from "reactflow";

const CharacterColors = {
    [Gender.Female_V]: "#ff66aa",
    [Gender.Female_P]: "#ffaaaa",
    [Gender.Female_VP]: "#ff66ff",
    [Gender.Male_V]: "#aaaaff",
    [Gender.Male_P]: "#66aaff",
    [Gender.Male_VP]: "#aaddff",
};

export interface ICharacterNodeProps extends ICharacter {}

type CharacterNodeProps = CustomNode<ICharacterNodeProps>;

const CharacterNode: React.FC<CharacterNodeProps> = (props) => {
    const { data } = props;

    const _image = {
        ref: getCharacterImagePath(data.path, "treeAvatar"),
        alt: data.name,
    };

    const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        event.currentTarget.src =
            getLocalFilePath("/images/noCharacterRef.jpg") ?? "";
    };

    return (
        <div className="character-node" id={data.id}>
            <div
                className="character-node--background"
                style={{
                    backgroundColor: data.data?.gender
                        ? CharacterColors[data.data.gender]
                        : "#ffffff",
                }}
            />
            <img
                className="character-node--image"
                src={getLocalFilePath(_image?.ref)}
                alt={_image.alt}
                onError={handleImageError}
            />
            <div className="character-node--name">
                <div className="character-node--name--text">{data.name}</div>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                id={`mother-top-handle-${data.id}`}
                className="character-node--handle handle-mother"
            />
            <Handle
                type="target"
                position={Position.Top}
                id={`center-top-handle-${data.id}`}
                className="character-node--handle handle-center"
            />
            <Handle
                type="target"
                position={Position.Top}
                id={`father-top-handle-${data.id}`}
                className="character-node--handle handle-father"
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id={`mother-bottom-handle-${data.id}`}
                className="character-node--handle handle-mother"
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id={`center-bottom-handle-${data.id}`}
                className="character-node--handle handle-center"
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id={`father-bottom-handle-${data.id}`}
                className="character-node--handle handle-father"
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`right-handle-${data.id}`}
                className="character-node--handle handle-right"
            />
        </div>
    );
};

export default CharacterNode;
