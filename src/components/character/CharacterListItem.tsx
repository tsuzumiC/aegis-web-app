import "./CharacterListItem.scss";

import {
    getCharacterImagePath,
    getLocalFilePath,
} from "components/utility/getLocalFile";

import EmptyImage from "components/EmptyImage";
import { useGetCharacterById } from "content/characters/api/hooks";
import { AppearanceTypeOrder, ICharacter } from "content/characters/Characters";

interface IProps {
    character: ICharacter;
}

const CharacterListItem = (props: IProps) => {
    const { character } = props;

    const _image = {
        ref: getCharacterImagePath(character.path, "treeAvatar"),
        alt: character.name,
    };

    return (
        <div className="character-list-item">
            <div className="character-list-item--info">
                <div className="character-list-item--name">
                    {character.name}
                    <div className="character-list-item--full-name">
                        {character.fullName}
                    </div>
                </div>
                <div className="character-list-item--description">
                    <div className="value-item">
                        <div className="value-label">Appearance</div>
                        {AppearanceTypeOrder.reduce((acc, type) => {
                            if (character.appearance[type]) {
                                acc.push(
                                    <div className="value-content">
                                        {type}: {character.appearance[type]}
                                    </div>
                                );
                            }
                            return acc;
                        }, [] as JSX.Element[])}
                    </div>
                    <div className="value-item">
                        <div className="value-label">Bio</div>
                        <div className="value-content">{character.bio}</div>
                    </div>
                </div>
            </div>
            <div className="character-list-item--image">
                {(
                    <img
                        src={getLocalFilePath(_image?.ref)}
                        alt={_image?.alt}
                    />
                ) ?? <EmptyImage />}
            </div>
        </div>
    );
};

export default CharacterListItem;
