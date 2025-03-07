
import { useParams } from "react-router"

import Header from "../../components/header"
import GetAttemptsComponent from "./components/getAttempts"


const AttemptsPage = () => {

    const {id} =  useParams()

    return(
        <div>
            <Header
                title={'Attempts'}
                subtitle={'Attempts per Student'}
                description={`el id es ${id}`}
            />

            <GetAttemptsComponent />
            
        </div>

    )
}

export default AttemptsPage