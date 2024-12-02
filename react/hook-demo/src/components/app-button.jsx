import './app-button.css'

const AppButton = (props) => {
    const { children, variant, onClick} = props
    let className = 'app-button'

    if (variant) {
        className = `${className} ${variant}`
    }
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default AppButton