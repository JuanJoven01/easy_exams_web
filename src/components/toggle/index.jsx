import PropTypes from 'prop-types'

const ToggleComponent = ({content, value, handleToggle}) => {

    return(
        <label className="inline-flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-medium text-gray-200">{content}</span>
                <div className="relative">
                    <input
                    type="checkbox"
                    className="sr-only"
                    checked={value}
                    onChange={handleToggle}
                    />
                    <div className='flex items-center'>
                        <div
                            className={`w-11 h-6 rounded-full transition-colors flex items-center ${
                                value ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                        >
                            <div
                                className={`relative left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform transform flex items-center ${
                                    value ? 'translate-x-full' : ''
                                }`}
                            ></div>
                        </div>
                        
                    </div>
                </div>
        </label>
    )
}

ToggleComponent.propTypes = {
    content : PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
}

export default ToggleComponent