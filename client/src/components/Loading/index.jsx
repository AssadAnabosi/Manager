import {
    LoadingContainer,
    LoadingCenter
} from './LoadingElements';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <LoadingCenter>
                    <ClipLoader size={300} color={"#000"} cssOverride={false} />
                </LoadingCenter>
            </LoadingContainer>
        </>
    )
}

export default Loading;

