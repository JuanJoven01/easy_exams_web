import PropTypes from 'prop-types';

const Header = ({ title, subtitle, description }) => {
    return (
        <section className="text-slate-300 mt-16 flex-col p-10 font-satoshi-blackitalic">
            <div className="bg-radial-gradient from-gradient_alpha via-gradient_bravo to-transparent to-70% backdrop-blur-sm">
                <h1 className="text-center p-5 pt-20 text-5xl font-bold">
                    {title}
                </h1>
                <h2 className="text-center p-5 text-4xl text-delta font-semibold bg-gradient-to-r from-blue-500 to-delta text-transparent bg-clip-text">
                    {subtitle}
                </h2>
                <h2 className="text-center py-5 px-10 text-3xl font-thin text-slate-400 font-satoshi-lightitalic">
                    {description}
                </h2>
            </div>
        </section>
    );
};

export default Header

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};