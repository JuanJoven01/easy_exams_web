import { Mosaic } from "react-loading-indicators"

const Loading = () => {
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
            ></div>

            {/* Loading */}
            <div>
                <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
            </div>
        </div>
    )
}

export default Loading