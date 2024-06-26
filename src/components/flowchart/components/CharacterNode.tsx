import "./CharacterNode.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";
import { ICharacter } from "content/characters/Characters";
import { Gender } from "content/characters/Gender";
import { CustomNode } from "../utility/NodeUtility";

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
        <div className="character-node">
            <div
                id={`misc1-handle-${data.id}`}
                className="character-node--handle handle-misc1"
            />
            <div
                id={`mother-handle-${data.id}`}
                className="character-node--handle handle-mother"
            />
            <div
                id={`misc2-handle-${data.id}`}
                className="character-node--handle handle-misc2"
            />
            <div
                id={`center-handle-${data.id}`}
                className="character-node--handle handle-center"
            />
            <div
                id={`misc3-handle-${data.id}`}
                className="character-node--handle handle-misc3"
            />
            <div
                id={`father-handle-${data.id}`}
                className="character-node--handle handle-father"
            />
            <div
                id={`misc4-handle-${data.id}`}
                className="character-node--handle handle-misc4"
            />
            <img
                className="character-node--image"
                src={getLocalFilePath(_image?.ref)}
                alt={_image.alt}
                onError={handleImageError}
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
            <div
                id={`out-handle-${data.id}`}
                className="character-node--handle handle-out"
            />
        </div>
    );
};

export default CharacterNode;
