const AppHeader = (props) => {
    console.log(props);
    const { name, theme } = props
    return (
        <div className="app-header">
            <h1 className="title">{name}</h1>
        </div>
    )
}

export default AppHeader