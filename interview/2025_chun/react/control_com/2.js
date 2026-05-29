function SearchBox() {
    const inputRef = React.useRef(null);

    const handleSearch = () => {
        console.log('Search Query:', inputRef.current.value);
    };

    return (
        <div>
            <input type="text" ref={inputRef} placeholder="Search..." />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}