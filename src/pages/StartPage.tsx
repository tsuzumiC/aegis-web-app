import "./StartPage.scss";

import { Location, Map, SVGMap } from "react-svg-map";

import Cultural from "map-svgs/Cultural";
import GovernmentSVG from "map-svgs/Government.svg";
import IndustrySVG from "map-svgs/Industry.svg";
import ResidentialSVG from "map-svgs/Residential.svg";
import SpecialSVG from "map-svgs/Special.svg";

const StartPage: React.FC = (props) => {
    return <div>Start Page</div>;
};

export default StartPage;

{
    /* <SVGMap map={Cultural} /> */
}
{
    /* <TransformWrapper
                initialScale={1}
                initialPositionX={200}
                initialPositionY={100}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <>
                        <div className="tools">
                            <button onClick={() => zoomIn()}>+</button>
                            <button onClick={() => zoomOut()}>-</button>
                            <button onClick={() => resetTransform()}>x</button>
                        </div>
                        <TransformComponent>
                            <div className="svg-wrapper">
                                <CulturalSVG />
                                <GovernmentSVG />
                                <IndustrySVG />
                                <ResidentialSVG />
                                <SpecialSVG />
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper> */
}
