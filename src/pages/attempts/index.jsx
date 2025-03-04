
import { useParams } from "react-router"

import Header from "../../components/header"


const AttemptsPage = () => {

    const {id} =  useParams()

    return(
        <div>
            <Header
                title={'Attempts'}
                subtitle={'Attempts per Student'}
                description={`el id es ${id}`}
            />

            
        </div>

    )
}

export default AttemptsPage