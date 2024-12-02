import './app-card.css'
const AppCard = (props) => {

    const { children, footer } = props
    return (
        <div className="app-card">
            <div className="content">{children}</div>
            { footer && <div className='footer'>{footer}</div>}
        </div>
    )

}

export default AppCard