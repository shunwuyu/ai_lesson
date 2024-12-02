import './app-button.css'

type AppButtonProps = {
    children: string
    variant: string
    onClick: () => void
}

const AppButton = (props: AppButtonProps) => {
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