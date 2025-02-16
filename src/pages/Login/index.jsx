import Header from '../../components/header'
import LoginComponent from './components/login'

const LoginPage = () => {

    return (
        <div className=' backdrop-blur-3xl'>
            <Header
                title="Login"
                subtitle="Lets Start!"
                description="If you already have an account, log in with your email and password to proceed to the course manager. If you do not have an account yet, you can go to easy apps to register."
            />
            <LoginComponent />
        </div>
    )
}

export default LoginPage