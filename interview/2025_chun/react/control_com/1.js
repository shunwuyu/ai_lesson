function FeedbackForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        console.log('Feedback:', form.elements.feedback.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea name="feedback" placeholder="Enter your feedback"></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}
