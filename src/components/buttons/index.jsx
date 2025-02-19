import PropTypes from 'prop-types'

const CustomButton = ({text, action}) => {

    return (
        <div    className=" hover:cursor-pointer mx-5 group relative overflow-hidden rounded-[16px] bg-gray-300 p-[2px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:via-slate-200 hover:to-charlie"
                onClick={action}>
            <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
            <div className="relative rounded-[15px] bg-slate-800 p-2">
                <button className=" hover:cursor-pointer  text-center font-satoshi-bolditalic text-xl bg-gradient-to-r from-blue-500 to-delta text-transparent bg-clip-text">{text}</button> 
            </div>
        </div>
    )
}

CustomButton.propTypes = {
    text : PropTypes.string.isRequired,
    action : PropTypes.func.isRequired
};

export default CustomButton