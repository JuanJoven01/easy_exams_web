import useGlobalContext from '../../../context/GlobalContext/useGlobalContext';

import PropTypes from 'prop-types'

import { removesCourseAPI } from '../services/courses';

const CourseEliminatorComponent = ({courseId, name, setIsCourseEliminator}) => {

    const authInfo = localStorage.getItem('easyAppsLogin')
    const jsonInfo = JSON.parse(authInfo)
    const token = jsonInfo.token

    const {setModal, setIsLoading } = useGlobalContext()


    const closeModalHandler = () => {
        setIsCourseEliminator(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response   =  await removesCourseAPI(
            courseId,
            token
        )
        if (response['status'] == 'error') {
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response['message'],
            })
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        setIsCourseEliminator(false)
        window.location.reload()
    };

    return (
        <section className="flex justify-center absolute z-50 w-full backdrop-grayscale-100  ">
                <div className="mb-10 mx-5 group relative w-96 overflow-hidden rounded-2xl bg-gray-300 p-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:via-slate-200 hover:to-charlie">
                    <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible " ></div>
                    <div className="relative rounded-xl bg-slate-800 p-6">
                    <h2 className="text-center text-2xl font-bold text-red-400 mb-6">{`Are you sure that wants to removes the course named:`}</h2>
                    <h2 className="text-center text-2xl font-bold text-white mb-6">{name}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">                       
                        <button
                            type="submit"
                            className=" hover:cursor-pointer w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Yes, Remove That
                        </button>
                        <button
                            type="cancel"
                            onClick={closeModalHandler}
                            className=" hover:cursor-pointer w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};


CourseEliminatorComponent.propTypes = {
    courseId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    setIsCourseEliminator : PropTypes.func.isRequired,
}

export default CourseEliminatorComponent;
