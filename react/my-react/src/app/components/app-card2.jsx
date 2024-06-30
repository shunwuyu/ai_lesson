const AppCard = (props) => {

    const { children } = props
    return (
        <div className="app-card">
            <div className="content">{children}</div>
        </div>
    )

}

export default AppCard